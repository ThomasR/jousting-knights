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

import { boardSizes, colors, defaultPalette, nnbsp } from './config.mjs';
import pieceLibrary, { aliases } from './config.pieceLibrary.mjs';
import { armyInfo, armyInput, boardSizeInfo, paletteInfo, paletteInput, sizeInput } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';

const updateSizeInfo = () => {
  let desiredSquareCount = boardSizes[sizeInput.value] ?? boardSizes[0];
  boardSizeInfo.textContent = `${String(desiredSquareCount)
    .replaceAll(/(.)(?=(?:.{3})+$)/g, `$1${nnbsp}`)}${nnbsp}px`;
};

const setInitialState = () => {
  let pieceTypes = Object.keys(pieceLibrary);
  armyField.itemPattern = pieceTypes.join('|');
  armyField.minLength = 1;
  const inverseAliases = Object.fromEntries(Object.entries(aliases).map(x => x.toReversed()));
  pieceTypes = pieceTypes.filter(p => !Object.hasOwn(aliases, p)).map(p => {
    if (Object.hasOwn(inverseAliases, p)) {
      return `${p}/${inverseAliases[p]}`;
    }
    return p;
  });
  armyInfo.textContent = `Available pieces: ${pieceTypes.join(', ')}.`;
  paletteInfo.textContent = `Available colors: ${Object.keys(colors).join(', ')}.`;
  paletteField.itemPattern = Object.keys(colors).join('|');
  paletteField.minLength = 2;
  enmitiesField.itemPattern = `[01]{${armyField.value.length}}`;
  enmitiesField.minLength = armyField.value.length;
  enmitiesField.maxLength = armyField.value.length;
  updateSizeInfo();
};

const refreshCheckboxGrid = () => {
  if (!armyInput.checkValidity() || !paletteInput.checkValidity()) {
    return;
  }

  let paletteRaw = paletteField.value;
  let labels = armyField.value.map((piece, i) => `${paletteRaw[i + 1]} ${piece}`);
  labels = labels.map(l => l.replaceAll(/(^| )(.)/g, (x) => `${x.toUpperCase()}`));
  labels = labels.map(l => l.replaceAll(/\bGold\b/g, 'Golden'));
  enmitiesField.labels = labels;
};

const initInteractivity = () => {
  sizeInput.addEventListener('input', updateSizeInfo);

  let lastArmyValue;
  armyInput.addEventListener('input', () => {
    if (!armyInput.checkValidity()) {
      return;
    }
    let armyValue = armyField.stringValue;
    if (armyValue === lastArmyValue) {
      return;
    }
    lastArmyValue = armyValue;
    let paletteWasValid = paletteInput.checkValidity();
    let minPaletteLength = armyField.value.length + 1;
    paletteField.minLength = minPaletteLength;

    if (!paletteInput.checkValidity() && paletteWasValid) {
      let palette = paletteField.value;
      while (palette.length < minPaletteLength) {
        let someColor = defaultPalette.find((c, i) => (i > 0) && (!palette.includes(c) || i === defaultPalette.length - 1));
        palette.push(someColor);
      }
      paletteField.value = palette;
    }
    refreshCheckboxGrid();
  });

  let lastPaletteValue;
  paletteInput.addEventListener('input', () => {
    let paletteValue = paletteField.stringValue;
    if (paletteValue === lastPaletteValue) {
      return;
    }
    lastPaletteValue = paletteValue;
    refreshCheckboxGrid();
  });
};

export default function initFormFields() {
  setInitialState();
  initInteractivity();
}
