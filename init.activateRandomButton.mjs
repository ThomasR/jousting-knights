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

import { randomButton, armyInput, paletteInput, triggerFormInput } from './htmlElements.mjs';

import {minRandomArmySize, maxRandomArmySize, defaultPalette } from './config.mjs';

const pieceTypes = Object.keys(pieceLibrary).filter(p => p !== 'elephant');

const getRandomBetween = (a, b) => a + Math.floor(Math.random() * (1 + b - a));

export default function () {
  randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let armySize = getRandomBetween(minRandomArmySize, maxRandomArmySize);
    let army = Array(armySize).fill(0).map(() => {
      let pieceIndex = getRandomBetween(0, pieceTypes.length - 1);
      return pieceTypes[pieceIndex];
    });
    army = army.join(' ');
    armyInput.value = army;
    let currentPalette = paletteInput.value;
    if (currentPalette.trim().split(/[\s,]+/g).length <= armySize) {
      paletteInput.value = defaultPalette.split(' ').slice(0, armySize + 1).join(' ');
    }
    triggerFormInput();
  });
}
