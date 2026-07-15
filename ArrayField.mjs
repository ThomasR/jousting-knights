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

export default class ArrayField {

  #htmlElement;
  #itemPattern;
  #minLength;
  #maxLength;
  #label;

  constructor({ htmlElement, minLength = 0, maxLength = Infinity }) {
    this.#htmlElement = htmlElement;
    this.#minLength = minLength;
    this.#maxLength = maxLength;
    this.#label = htmlElement.closest('label');
  }

  #normalize(value) {
    return value.replaceAll(/[, ]+/g, ' ').trim();
  }

  get stringValue() {
    let raw = this.#htmlElement.value;
    return this.#normalize(raw);
  }

  set stringValue(value) {
    this.#htmlElement.value = this.#normalize(value);
  }

  get value() {
    return this.stringValue.split(' ');
  }

  set value(value) {
    this.#htmlElement.value = value.join(' ');
  }

  checkValidity() {
    return this.#htmlElement.checkValidity();
  }

  set minLength(minLength) {
    this.#minLength = minLength;
    this.#updatePattern();
    if (this.#label?.dataset.invalidMessage) {
      this.#label.dataset.invalidMessage = this.#label.dataset.invalidMessage.replace(/\d+/, minLength);
    }
  }

  set maxLength(maxLength) {
    this.#maxLength = maxLength;
    this.#updatePattern();
    if (this.#label?.dataset.invalidMessage) {
      this.#label.dataset.invalidMessage = this.#label.dataset.invalidMessage.replace(/(\d+.+)(\d+)/, `\$1${maxLength}`);
    }
  }

  set itemPattern(itemPattern) {
    this.#itemPattern = itemPattern;
    this.#updatePattern(!itemPattern);
  }

  #updatePattern(force = false) {
    if (!this.#itemPattern) {
      if (force) {
        this.#htmlElement.pattern = '';
      }
      return;
    }
    let minLength = this.#minLength;
    let maxLength = this.#maxLength;
    if (maxLength < minLength) {
      maxLength = minLength;
    }
    let multiplier;
    if (minLength === 0) {
      if (maxLength === Infinity) {
        multiplier = '*';
      } else if (maxLength === 1) {
        multiplier = '?';
      } else {
        multiplier = `{,${maxLength}}`;
      }
    } else if (maxLength === Infinity) {
      if (minLength === 1) {
        multiplier = '+';
      } else {
        multiplier = `{${minLength},}`;
      }
    } else if (minLength === maxLength) {
      multiplier = `{${minLength}}`;
    } else {
      multiplier = `{${minLength},${maxLength}}`;
    }
    this.#htmlElement.pattern = ` *((${this.#itemPattern})\\b[, ]*)${multiplier}`;
  }

  reset() {
    this.#htmlElement.value = this.#htmlElement.defaultValue;
  }
}
