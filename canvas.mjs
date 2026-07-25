/*
* Copyright 2026 Thomas Rosenau
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

export function clear(canvas) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
}

export function resetZoom(canvas) {
  canvas.style.transform = 'none';
  delete canvas.dataset.zoomLevel;
}

const minZoom = 0;
const minVisiblePixels = 9;

export function zoom(canvas, direction) {
  let currentZoomLevel = Number(canvas.dataset.zoomLevel || minZoom);
  let nextZoomLevel = currentZoomLevel + direction;
  const maxZoom = Math.floor(Math.log2(canvas.width / minVisiblePixels));
  if (minZoom > nextZoomLevel || nextZoomLevel > maxZoom) {
    return;
  }
  canvas.dataset.zoomLevel = nextZoomLevel;
  canvas.style.transform = `scale(${2 ** nextZoomLevel})`;
}

export function incrementalDraw({ canvas, pixelPainter, palette, sharedState, callback }) {
  console.time('[🎨canvas] ⚙️ Initializing canvas');
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const backgroundColor = palette.shift();
  const imgData = ctx.createImageData(width, height);
  const pixels = new Uint32Array(imgData.data.buffer);
  const bgBytes = (255 << 24) | (backgroundColor[2] << 16) | (backgroundColor[1] << 8) | backgroundColor[0];
  pixels.fill(bgBytes);
  console.timeEnd('[🎨canvas] ⚙️ Initializing canvas');

  console.time('[🎨canvas] ⬜️ Filling background');
  ctx.fillStyle = `rgb(${backgroundColor.join(',')})`;
  ctx.fillRect(0, 0, width, height);
  console.timeEnd('[🎨canvas] ⬜️ Filling background');

  console.time('[🎨canvas] ⚙️ Initializing painter');
  const gen = pixelPainter({ pixels, ctx, imgData });
  console.timeEnd('[🎨canvas] ⚙️ Initializing painter');

  const logMsg = `[🎨canvas] 🖌️ ${width}×${height} board`;
  console.time(logMsg);

  let totalPainted = 0;
  const renderNextBatch = () => {
    if (sharedState.cancelled) {
      sharedState.cancelled = false;
      console.timeEnd(logMsg);
      callback(false);
      return;
    }
    let { value } = gen.next();
    if (!value) {
      console.timeEnd(logMsg);
      callback(true);
      return;
    }
    totalPainted += value;
    const percentage = (Math.round(1000 * totalPainted / (width * height)) / 10).toFixed(1);
    console.timeLog(logMsg, `${percentage}%`);
    requestAnimationFrame(renderNextBatch);
  };

  requestAnimationFrame(renderNextBatch);
}
