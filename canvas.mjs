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

export default function incrementalDraw({ canvas, pixelDataGenerator, palette, sharedState }) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  const backgroundColor = palette.shift();
  ctx.fillStyle = `rgb(${backgroundColor.join(',')})`;
  ctx.fillRect(0, 0, width, height);

  const paletteBytes = palette.map(([r, g, b]) => (255 << 24) | (b << 16) | (g << 8) | r);

  const imgData = ctx.getImageData(0, 0, width, height);
  const buf32 = new Uint32Array(imgData.data.buffer);
  const gen = pixelDataGenerator();
  const logMsg = `[canvas] 🖌️ ${width}×${height} board`;

  function renderNextBatch() {
    if (sharedState.cancelled) {
      sharedState.cancelled = false;
      console.timeEnd(logMsg);
      return;
    }
    let { value } = gen.next();
    if (!value) {
      console.timeEnd(logMsg);
      return;
    }
    for (let pixelData of value) {
      let [x, y, i] = pixelData;
      buf32[y * width + x] = paletteBytes[i];
    }

    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(renderNextBatch);
  }

  console.time(logMsg);
  requestAnimationFrame(renderNextBatch);
}
