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

const logMsg = '[꩜spiral] 🧮 Computing coordinates';

export const spiralMap = boardSize => {
  console.time(logMsg);
  let UintArray = boardSize < 2 ** 8 ? Uint8Array : Uint16Array;
  const squareCount = boardSize ** 2;
  let currentX = Math.floor((boardSize - 1) / 2);
  let currentY = Math.floor((boardSize - 1) / 2);
  const x = new UintArray(squareCount);
  const y = new UintArray(squareCount);
  let deltaX = 1;
  let deltaY = 0;
  let edgeLength = 1;
  let remainingToCorner = edgeLength;
  for (let stepCount = 0; stepCount < squareCount; stepCount++) {
    x[stepCount] = currentX;
    y[stepCount] = currentY;
    currentX += deltaX;
    currentY += deltaY;
    remainingToCorner--;
    if (remainingToCorner === 0) {
      remainingToCorner = edgeLength;
      if (deltaX === 0) {
        deltaX = -deltaY;
        deltaY = 0;
        edgeLength++;
      } else {
        deltaY = deltaX;
        deltaX = 0;
      }
    }
  }
  console.timeEnd(logMsg);
  return [x, y];
};
