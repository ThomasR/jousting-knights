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

export const spiralCoordinates = (number, originOffsetX = 0, originOffsetY = originOffsetX) => {
  if (number === 0) {
    return [originOffsetX, originOffsetY];
  }

  const ring = Math.ceil((Math.sqrt(number + 1) - 1) / 2);
  const sideLength = ring * 2;
  const maxValue = (2 * ring + 1) ** 2 - 1;
  const offset = maxValue - number;

  let x, y;

  if (offset < sideLength) {
    // bottom
    x = ring - offset;
    y = ring;
  } else if (offset < 2 * sideLength) {
    // left
    x = -ring;
    y = ring - (offset - sideLength);
  } else if (offset < 3 * sideLength) {
    // top
    x = -ring + (offset - 2 * sideLength);
    y = -ring;
  } else {
    // right
    x = ring;
    y = -ring + (offset - 3 * sideLength);
  }

  return [x + originOffsetX, y + originOffsetY];
};

export const spiralMap = boardSize => {
  const offsetX = Math.floor((boardSize - 1)/ 2);
  const offsetY = Math.floor(boardSize/ 2);
  let squareCount = boardSize ** 2;
  let x = new Uint16Array(squareCount);
  let y = new Uint16Array(squareCount);
  for (let i = 0; i < squareCount; i++) {
    [x[i], y[i]] = spiralCoordinates(i, offsetX, offsetY);
  }
  return [x, y];
};
