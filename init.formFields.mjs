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

import { colors } from './config.mjs';
import pieceLibrary, { aliases } from './config.pieceLibrary.mjs';
import { armyInfo, paletteInfo } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';

export default function initFormFields() {
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
}
