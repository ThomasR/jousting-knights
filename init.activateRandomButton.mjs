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

import {
  armyInput, enmitiesInput, paletteInput, randomArmyButton, randomEnmitiesButton, triggerFormInput
} from './htmlElements.mjs';

import { defaultPalette, maxRandomArmySize, minRandomArmySize } from './config.mjs';
import { getDefaultEmnities } from './coreLogic.mjs';
import refresh from './refresh.mjs';

const pieceTypes = Object.keys(pieceLibrary).filter(p => p !== 'elephant');

const getRandomBetween = (a, b) => a + Math.floor(Math.random() * (1 + b - a));


export default function () {
  randomArmyButton.addEventListener('click', (e) => {
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
    enmitiesInput.value = getDefaultEmnities(armySize);
    triggerFormInput();
  });

  randomEnmitiesButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let armySize = armyInput.value.trim().split(/[, ]+/).length;
    let lastValue = enmitiesInput.value.trim().replaceAll(/[, ]/g, ' ');
    let nextValue;
    do {
      let randomEnmities = Array(armySize).fill(0).map(() => {
        let randomized = Array(armySize).fill(0).map(() => Math.round(Math.random()));
        return randomized.join('');
      });
      nextValue = randomEnmities.join(' ');
    } while (nextValue === lastValue);
    enmitiesInput.value = nextValue;
    refresh();
  });

  setInterval(() => {
    randomEnmitiesButton.disabled = !armyInput.checkValidity();
  }, 500);
}
