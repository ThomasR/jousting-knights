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

import pieceLibrary, { aliases } from './config.pieceLibrary.mjs';
import { randomArmyButton, randomEnmitiesButton, triggerFormInput } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';
import { defaultPalette, maxRandomArmySize, minRandomArmySize } from './config.mjs';
import { getDefaultEnmities } from './coreLogic.mjs';
import refresh from './refresh.mjs';

const pieceTypes = Object.keys(pieceLibrary).filter(p => !Object.hasOwn(aliases, p));

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
    armyField.value = army;
    if (paletteField.value.length <= armySize) {
      paletteField.value = defaultPalette.split(' ').slice(0, armySize + 1);
    }
    enmitiesField.value = getDefaultEnmities(armySize);
    triggerFormInput();
  });

  randomEnmitiesButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let armySize = armyField.value.length;
    let lastValue = enmitiesField.stringValue;
    let nextValue;
    do {
      nextValue = Array(armySize).fill(0).map(() => {
        return getRandomBetween(1, 2 ** armySize - 1).toString(2).padStart(armySize, '0');
      });
    } while (nextValue.join(' ') === lastValue);
    enmitiesField.value = nextValue;
    refresh();
  });

  setInterval(() => {
    randomEnmitiesButton.disabled = !armyField.checkValidity() || armyField.value.length === 1;
  }, 500);
}
