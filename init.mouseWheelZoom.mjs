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

import { canvasContainer } from './htmlElements.mjs';

const minZoom = 0;
const minVisiblePixels = 9;

let lastHandled = 0;

canvasContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  let now = Date.now();
  if (now - lastHandled < 150) {
    return;
  }
  lastHandled = now;
  let canvas = canvasContainer.querySelector('canvas');
  let currentZoomLevel = Number(canvas.dataset.zoomLevel || minZoom);
  let delta = Math.sign(-event.deltaY);
  let nextZoomLevel = currentZoomLevel + delta;
  const maxZoom = Math.floor(Math.log2(canvas.width / minVisiblePixels));
  if (minZoom > nextZoomLevel || nextZoomLevel > maxZoom) {
    return;
  }
  canvas.dataset.zoomLevel = nextZoomLevel;
  canvas.style.transform = `scale(${2 ** nextZoomLevel})`;
});
