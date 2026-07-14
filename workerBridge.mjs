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

import pieceLibrary from './config.pieceLibrary.mjs';

const url = new URL('./worker.mjs', import.meta.url);

let myWorker;
let callbacks;
let idCounter;
let offscreenCanvas;

const onMessage = ({ data: [payload, callbackId] }) => {
  let callback = callbacks[callbackId];
  if (callback) {
    callback.apply(null, payload);
  }
};

const initializeWorker = () => {
  myWorker = new Worker(url, {
    type: 'module'
  });
  callbacks = {};
  idCounter = 0;
  myWorker.onmessage = onMessage;
};

export default function updateBoard({
  army,
  enmities,
  desiredSquareCount,
  palette
}) {
  let canvas = document.querySelector('canvas#output');
  if (myWorker) {
    cancel();
  }
  initializeWorker();

  try {
    offscreenCanvas = canvas.transferControlToOffscreen();
  } catch {
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'output';
    canvas.parentNode.replaceChild(newCanvas, canvas);
    offscreenCanvas = newCanvas.transferControlToOffscreen();
  }

  myWorker.postMessage(['draw', {
    canvas: offscreenCanvas,
    palette,
    army: army.map(pieceType => pieceLibrary[pieceType]),
    enmities,
    desiredSquareCount
  }], [offscreenCanvas]);

};

export function cancel() {
  if (myWorker) {
    myWorker.postMessage(['cancel']);
  }
}
