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

import incrementalDraw from './canvas.mjs';
import { getPixelPainter } from './coreLogic.mjs';

const sharedState = {
  cancelled: false
};

const cancel = () => {
  sharedState.cancelled = true;
};

const minWidth = 5;
const draw = ({ canvas, palette, army, desiredSquareCount, enmities }) => {

  let boardSize = Math.ceil(desiredSquareCount ** .5);
  if (boardSize % 2 === 0) {
    boardSize++;
  }
  boardSize = Math.max(boardSize, minWidth);

  canvas.width = boardSize;
  canvas.height = boardSize;

  const pixelPainter = getPixelPainter({
    boardWidth: boardSize,
    army,
    enmities,
    palette
  });

  incrementalDraw({
    canvas,
    pixelPainter,
    palette,
    sharedState
  });
};

const callableMethods = {
  draw,
  cancel
};

self.onmessage = ({ data }) => {
  console.debug('[worker] 📥 ', ...data);
  const [method, ...args] = data;
  if (!Object.hasOwn(callableMethods, method)) {
    throw new Error(`unknown method "${method}"`);
  }
  return callableMethods[method].apply(null, args);
};
