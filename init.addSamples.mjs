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

import sampleArmies from './config.sampleArmies.mjs';
import { form, paletteInput, armyInput, triggerFormInput } from './htmlElements.mjs';

export default function () {
  sampleArmies.forEach(sampleArmy => {
    let fieldset = document.createElement('fieldset');
    form.insertBefore(fieldset, null);
    let legend = document.createElement('legend');
    legend.textContent = sampleArmy.label;
    fieldset.appendChild(legend);
    sampleArmy.values.forEach(([army, palette]) => {
      let button = document.createElement('button');
      button.textContent = army;
      button.dataset.army = army;
      button.dataset.palette = palette;
      fieldset.appendChild(button);
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        armyInput.value = button.dataset.army;
        armyInput.setCustomValidity('');
        paletteInput.value = button.dataset.palette;
        paletteInput.setCustomValidity('');
        triggerFormInput();
      });
    });
  })
};
