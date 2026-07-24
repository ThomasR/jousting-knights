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
import { canvasContainer } from './htmlElements.mjs';

const url = new URL('./worker.mjs', import.meta.url);

let myWorker;
let callbacks;
let idCounter;
let offscreenCanvas;

const onMessage = ({ data: [payload, callbackId] }) => {
  let callback = callbacks[callbackId];
  if (callback) {
    callback.apply(null, payload);
    delete callbacks[callbackId];
  }
};

const onError = (e) => {
  console.error('Worker error caught in main thread:', e);
};

const initializeWorker = () => {
  if (!myWorker) {
    myWorker = new Worker(url, {
      type: 'module'
    });
    myWorker.onmessage = onMessage;
    myWorker.onerror = onError;
    callbacks = {};
    idCounter = 0;
  }
};

export default function updateBoard({
  army,
  enmities,
  desiredSquareCount,
  palette,
  callback
}) {
  let canvas = canvasContainer.querySelector('canvas');
  if (myWorker) {
    cancel();
  }
  initializeWorker();

  let callbackId = `callbackId:${idCounter}`;
  idCounter++;
  callbacks[callbackId] = callback;

  let transfer = [];
  let canvasArg = null;

  if (!offscreenCanvas) {
    offscreenCanvas = canvas.transferControlToOffscreen();
    transfer = [offscreenCanvas];
    canvasArg = offscreenCanvas;
  }

  myWorker.postMessage(['draw', {
    canvas: canvasArg,
    palette,
    army: army.map(pieceType => pieceLibrary[pieceType]),
    enmities,
    desiredSquareCount,
    callbackId
  }], transfer);

};

export function cancel() {
  if (myWorker) {
    myWorker.postMessage(['cancel']);
  }
}
