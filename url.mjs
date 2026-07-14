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

import { form } from './htmlElements.mjs';

let normalize = str => str.replaceAll(/[\s,]+/g, ' ').trim();

export function updateUrl() {
  let params = new URLSearchParams(new FormData(form));
  params.set('army', normalize(params.get('army')));
  params.set('palette', normalize(params.get('palette')));
  history.replaceState(null, '', `#${params}`);
}

export function updateFormFromUrl() {
  let hash = location.hash.replace(/^#/, '');
  const params = new URLSearchParams(hash);

  for (const element of form.elements) {
    if (element.name && params.has(element.name)) {
      element.value = params.get(element.name);
    }
  }
}