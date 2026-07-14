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

import { spiralMap } from './spiral.mjs';
import {paintThresholds} from './config.mjs';

export const getDefaultEmnities = armySize => {
  if (armySize === 1) {
    return '1';
  }
  let emnities = Array(armySize).fill(0).map((_, i) =>
     `${Array(i).fill('1').join('')}0${Array(armySize - i - 1).fill('1').join('')}`
  );
  return emnities.join(' ');
};

const getMovementCatalog = army => army.map(movement => {
  const movementPatterns = [];
  for (let epsX of [1, -1]) {
    for (let epsY of [1, -1]) {
      movementPatterns.push(epsX * movement[0], epsY * movement[1]);
      if (movement[0] !== movement[1]) {
        movementPatterns.push(epsX * movement[1], epsY * movement[0]);
      }
    }
  }
  return movementPatterns;
});

const getThreatMasks = (army, enmities) => ({
  me: army.map((_, i) => 1 << (army.length - 1 - i)),
  enemies: enmities.map(x => parseInt(x, 2)),
});

export const getPixelDataGenerator = ({
  boardWidth,
  army,
  enmities
}) => {
  const squareCount = boardWidth ** 2;

  // minimize memory usage
  const UintArray = (army.length <= 8) ? Uint8Array : (army.length <= 16) ? Uint16Array : Uint32Array;
  if (army.length > 32) {
    throw new Error('Only up to 32 pieces allowed');
  }

  const threatMasks = getThreatMasks(army, enmities);
  const movementPatternCatalog = getMovementCatalog(army);

  const [spiralX, spiralY] = spiralMap(boardWidth);

  return function* pixelDataGenerator() {
    let done = new Set();
    let lastPieceIndex = Array(army.length).fill(-1);
    let occupied = new Uint8Array(squareCount);
    let pieceType = -1;
    // note: works only for up to 8 pieces
    let threatened = new UintArray(squareCount);
    let x, y;
    let pixels = [];
    let updateThreshold = squareCount > paintThresholds.minBoardSize ? paintThresholds.initialPaint : squareCount;

    outer: while (true) {
      pieceType = (pieceType + 1) % army.length;
      if (done.has(pieceType)) {
        continue;
      }
      const myBitMask = threatMasks.me[pieceType];

      // find next available square
      let spiralIndex = lastPieceIndex[pieceType];
      do {
        spiralIndex++;
        if (spiralIndex >= squareCount) {
          done.add(pieceType);
          if (done.size === army.length) {
            break outer;
          }
          continue outer;
        }
        x = spiralX[spiralIndex];
        y = spiralY[spiralIndex];
      } while (occupied[spiralIndex] || (threatened[y * boardWidth + x] & myBitMask));
      lastPieceIndex[pieceType] = spiralIndex;
      occupied[spiralIndex] = pieceType + 1;

      // update threatened squares
      const bitMask = threatMasks.enemies[pieceType];
      const movementPatterns = movementPatternCatalog[pieceType];
      for (let i = 0; i < movementPatterns.length; i += 2) {
        const targetX = x + movementPatterns[i];
        const targetY = y + movementPatterns[i + 1];
        if (targetX >= 0 && targetY >= 0 && targetX < boardWidth && targetY < boardWidth) {
          threatened[targetY * boardWidth + targetX] |= bitMask;
        }
      }

      // process result
      pixels.push([x, y, pieceType]);
      if (pixels.length > updateThreshold) {
        updateThreshold = paintThresholds.subsequentPaints;
        yield pixels;
        pixels = [];
      }

    }
    yield pixels;
  };
};
