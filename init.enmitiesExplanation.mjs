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

import { enmitiesExplanation } from './htmlElements.mjs';
import { armyField, enmitiesField, paletteField } from './formFields.mjs';
import { getDefaultEnmities } from './coreLogic.mjs';

const getAttackedPieces = ({
  colors,
  army,
  index,
  enmities,
  defaultEnmities
}) => {
  let mask = enmities[index];
  if (/^0+$/.test(mask)) {
    return ['nothing (dummy piece)'];
  }
  if (army.length >= 2 && /^1+$/.test(mask)) {
    return ['everything'];
  }
  if (army.length > 2 && mask === defaultEnmities[index]) {
    return ['all other piece types'];
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
  let defaultEnmities = getDefaultEnmities(army.length);
  let phrases = army.map((piece, index) => {
    let attackedPieces = getAttackedPieces({ colors, army, index, enmities, defaultEnmities });
    let result = `${colors[index]} ${piece} attacks ${attackedPieces.join(', ').replace(/, ([^,]+)$/, ' and $1')}.`;
    return result.replaceAll(/([Gg])old\b/g, '$1olden');
  });
  phrases = phrases.map(phrase => phrase[0].toUpperCase() + phrase.slice(1));
  return phrases.join('\n');
};

export default function () {
  let lastFingerprint;
  let update = () => {
    if (!enmitiesField.checkValidity() || !armyField.checkValidity() || !paletteField.checkValidity()) {
      return;
    }
    let enmities = enmitiesField.value;
    let army = armyField.value;
    let colors = paletteField.value;
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
    let oldLineCount = enmitiesExplanation.style.getPropertyValue('--line-count');
    let newLineCount = Math.max(enmities.length, Number(oldLineCount));
    enmitiesExplanation.style.setProperty('--line-count', newLineCount);
  };
  update();
  setInterval(update, 500);
}
