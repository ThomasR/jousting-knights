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

import { boardSizes, colors, nnbsp } from './config.mjs';
import updateBoard from './workerBridge.mjs';

import { armyInput, boardSizeInfo, canvasContainer,enmitiesInput, paletteInput, saveButton, sizeInput } from './htmlElements.mjs';
import { updateUrl } from './url.mjs';
import { updateTitle } from './page.mjs';
import { getDefaultEnmities } from './coreLogic.mjs';

let lastValid = null;

export default function refresh(event) {
  let desiredSquareCount = boardSizes[sizeInput.value] ?? boardSizes[0];
  boardSizeInfo.textContent = `${String(desiredSquareCount).replaceAll(/(.)(?=(?:.{3})+$)/g, `$1${nnbsp}`)}${nnbsp}px`;

  let isArmyValid = armyInput.checkValidity();
  if (!isArmyValid) {
    if (event) {
      return;
    } else {
      armyInput.value = armyInput.defaultValue;
    }
  }
  let army = armyInput.value.toLowerCase().trim().split(/[\s,]+/g).filter(Boolean);

  let requiredPaletteLength = army.length + 1;
  paletteInput.setAttribute('pattern', paletteInput.getAttribute('pattern').replace(/\d+/, requiredPaletteLength));
  let paletteLabel = paletteInput.closest('label');
  paletteLabel.dataset.invalidMessage = paletteLabel.dataset.invalidMessage.replace(/\d+/, requiredPaletteLength);

  let requiredEnmitiesLength = army.length;
  enmitiesInput.setAttribute('pattern', enmitiesInput.getAttribute('pattern')
    .replaceAll(/\{\d+/g, `{${requiredEnmitiesLength}`));

  let isPaletteValid = paletteInput.checkValidity();
  if (!isPaletteValid) {
    if (event) {
      return;
    } else {
      paletteInput.value = paletteInput.defaultValue;
    }
  }
  let palette = paletteInput.value.toLowerCase().trim().split(/[\s,]+/g).slice(0, requiredPaletteLength)
    .map(color => colors[color]);

  const defaultEnmities = getDefaultEnmities(requiredEnmitiesLength);
  let isEnmitiesValid = enmitiesInput.checkValidity();
  if (!isEnmitiesValid) {
    if (event?.target === enmitiesInput) {
      return;
    } else {
      enmitiesInput.value = defaultEnmities;
    }
  }

  const enmities = enmitiesInput.value.trim().split(/\s+/g);

  let sizeStr = String(desiredSquareCount).replace(/000000$/, '_000000').replace(/000$/, '_000');
  if (enmities.join(' ') === defaultEnmities) {
    saveButton.dataset.filename = `${army.join('-')}-${sizeStr}.png`;
  } else {
    saveButton.dataset.filename = `${army.join('-')}-${enmities.join('-')}-${sizeStr}.png`;
  }

  let currentValid = `${desiredSquareCount}-${enmities.join('')}-${army.join(',')}-${palette.flat().join(',')}`;
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
    callback: (e) => {
      canvasContainer.classList.remove('loading');
    }
  });
};
