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

import { boardSizes, colors } from './config.mjs';
import updateBoard from './workerBridge.mjs';

import { canvasContainer, saveButton, sizeInput } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';
import { updateUrl } from './url.mjs';
import { updateTitle } from './page.mjs';
import { getDefaultEnmities } from './coreLogic.mjs';

let lastValid = null;

export default function refresh(event) {
  let desiredSquareCount = boardSizes[sizeInput.value] ?? boardSizes[0];
  let isArmyValid = armyField.checkValidity();
  if (!isArmyValid) {
    if (event) {
      return;
    } else {
      armyField.reset();
    }
  }
  let army = armyField.value;

  let requiredPaletteLength = army.length + 1;

  let isPaletteValid = paletteField.checkValidity();
  if (!isPaletteValid) {
    if (event) {
      return;
    } else {
      paletteField.reset();
    }
  }

  let palette = paletteField.value.slice(0, requiredPaletteLength).map(color => colors[color]);

  const enmities = enmitiesField.stringValue;
  const defaultEnmities = getDefaultEnmities(army.length);

  let sizeStr = String(desiredSquareCount).replace(/000000$/, '_000000').replace(/000$/, '_000');
  if (enmities === defaultEnmities) {
    saveButton.dataset.filename = `${army.join('-')}-${sizeStr}.png`;
  } else {
    saveButton.dataset.filename = `${army.join('-')}-${enmities}-${sizeStr}.png`;
  }

  let currentValid = `${desiredSquareCount}-${enmities}-${army.join(',')}-${palette.flat().join(',')}`;
  if (currentValid === lastValid) {
    // prevent refresh after user has only entered whitespace
    return;
  }
  lastValid = currentValid;

  updateUrl();

  updateTitle(army);

  canvasContainer.classList.add('loading');
  updateBoard({
    army,
    enmities,
    desiredSquareCount,
    palette,
    callback: () => {
      canvasContainer.classList.remove('loading');
    }
  });
};
