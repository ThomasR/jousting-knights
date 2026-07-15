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
import { form, triggerFormInput } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';
import { getDefaultEnmities } from './coreLogic.mjs';

export default function () {
  sampleArmies.forEach(sampleArmy => {
    let fieldset = document.createElement('fieldset');
    form.insertBefore(fieldset, null);
    let legend = document.createElement('legend');
    legend.textContent = sampleArmy.label;
    fieldset.appendChild(legend);
    sampleArmy.values.forEach(([army, palette, enmities]) => {
      let button = document.createElement('button');
      button.type = 'button';
      button.textContent = army;
      button.dataset.army = army;
      button.dataset.palette = palette;
      if (!enmities) {
        let armySize = [...army.matchAll(/\S+/g)].length;
        enmities = getDefaultEnmities(armySize).join(' ');
      }
      button.dataset.enmities = enmities;
      fieldset.appendChild(button);
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        armyField.stringValue = button.dataset.army;
        paletteField.stringValue = button.dataset.palette;
        enmitiesField.stringValue = button.dataset.enmities;
        triggerFormInput();
      });
    });
  });
};
