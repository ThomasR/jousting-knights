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


import { titleTemplate } from './config.mjs';

const pluralize = w => w.endsWith('z') ? `${w}es` : w.endsWith('y') ? w.replace(/y$/, 'ies') : `${w}s`;

export const updateTitle = (army) => {
  let armyFormatted = army.map(pieceName => pieceName[0].toUpperCase() + pieceName.substring(1));
  let uniq = new Set(armyFormatted);
  let displayString;
  if (uniq.size === 1) {
    displayString = pluralize(armyFormatted[0]);
  } else {
    displayString = armyFormatted.join(', ');
  }
  document.title = titleTemplate.replace('{{army}}', displayString);
};
