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

import { armyInput, enmitiesExplanation, enmitiesInput, paletteInput } from './htmlElements.mjs';
import { getDefaultEmnities } from './coreLogic.mjs';

const getAttackedPieces = ({
  colors,
  army,
  index,
  enmities,
  defaultEmnities
}) => {
  let mask = enmities[index];
  if (/^0+$/.test(mask)) {
    return ['nothing'];
  }
  if (army.length > 2) {
    if (/^1+$/.test(mask)) {
      return ['everything'];
    }
    if (mask === defaultEmnities[index]) {
      return ['all other piece types'];
    }
  }
  return mask.split('').reduce((list, bit, i) => {
    if (Number(bit)) {
      list.push(`${colors[i]} ${army[i]}`);
    }
    return list;
  }, []);
};

const getTextContent = ({
  colors,
  army,
  enmities
}) => {
  let defaultEmnities = getDefaultEmnities(army.length).split(' ');
  let phrases = army.map((piece, index) => {
    let attackedPieces = getAttackedPieces({ colors, army, index, enmities, defaultEmnities });
    let result = `${colors[index]} ${piece} attacks ${attackedPieces.join(', ').replace(/, ([^,]+)$/, ' and $1')}.`;
    return result.replaceAll(/([Gg])old/g, '$1olden');
  });
  phrases = phrases.map(phrase => phrase[0].toUpperCase() + phrase.slice(1));
  return phrases.join('\n');
};

export default function () {
  let lastFingerprint;
  setInterval(() => {
    if (!enmitiesInput.checkValidity() || !armyInput.checkValidity() || !paletteInput.checkValidity()) {
      return;
    }
    let enmities = enmitiesInput.value.trim().split(/[\s,]+/);
    let army = armyInput.value.trim().split(/[\s,]+/);
    let colors = paletteInput.value.trim().split(/[\s,]+/);
    colors.shift();
    let fingerprint = JSON.stringify([enmities, colors, army]);
    if (fingerprint === lastFingerprint) {
      return;
    }
    lastFingerprint = fingerprint;
    enmitiesExplanation.textContent = getTextContent({
      enmities,
      army,
      colors
    });
  }, 500);
}
