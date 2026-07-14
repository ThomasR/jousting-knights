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

import initFormFields from './init.formFields.mjs';
import addSamples from './init.addSamples.mjs';
import refresh from './refresh.mjs';
import activateSaveButton from './init.activateSaveButton.mjs';
import activateRandomButton from './init.activateRandomButton.mjs';
import updateSlider from './init.updateSlider.mjs';
import './init.hotkeys.mjs';
import './init.mouseWheelZoom.mjs';
import setupEnmitiesExplanation from './init.enmitiesExplanation.mjs';
import { form } from './htmlElements.mjs';
import { updateFormFromUrl } from './url.mjs';

initFormFields();
addSamples();
updateSlider();
activateSaveButton();
activateRandomButton();
updateFormFromUrl();
setupEnmitiesExplanation();

form.addEventListener('input', refresh);
refresh();
