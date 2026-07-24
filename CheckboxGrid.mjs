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

export default class CheckboxGrid {
  #container;
  #value;
  #labels;
  #hiddenField;
  #labelPostfix;
  #emptyText;

  constructor({ container, labels, value, name, labelPostfix = '', emptyText = 'none' }) {
    this.#container = container;
    this.#value = value || [];
    this.#labels = labels || [];
    this.#labelPostfix = labelPostfix;
    this.#emptyText = emptyText;
    this.#hiddenField = document.createElement('input');
    this.#hiddenField.setAttribute('type', 'hidden');
    this.#hiddenField.name = name;
    this.#setHiddenFieldValue();
    this.#container.append(this.#hiddenField);
    this.#refreshUI();
    this.#container.addEventListener('change', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.#syncValueFromInputs();
      this.#hiddenField.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }, false);
  }

  get value() {
    return this.#value;
  }

  set value(val) {
    this.#value = val;
    this.#syncValueToInputs();
  }

  get stringValue() {
    return this.value.map(
      row => row.map(value => value ? '1' : '0').join('')
    ).join(' ');
  }

  set stringValue(val) {
    this.value = val.split(' ').map(s => s.split('').map(x => x !== '0'));
  }

  set labels(val) {
    let oldLength = this.#value.length;
    if (val.length === oldLength && val.every((label, i) => label === this.#labels[i])) {
      return;
    }
    this.#labels = val;
    if (val.length !== oldLength) {
      let value;
      if (val.length === 1) {
        value = [[true]];
      } else {
        value = Array.from({ length: val.length }, () => Array(val.length).fill(false));
        for (let i = 0; i < val.length; i++) {
          for (let j = 0; j < val.length; j++) {
            if (i < oldLength && j < oldLength && oldLength > 1) {
              value[i][j] = this.#value[i][j];
            } else {
              value[i][j] = (i !== j);
            }
          }
        }
      }
      this.#value = value;
    }
    this.#refreshUI();
  }

  #refreshUI() {
    this.#container.querySelectorAll('label,.label').forEach((element) => {
      element.remove();
    });
    this.#container.style.setProperty('--item-count', this.#labels.length);
    if (this.#labels.length === 0) {
      let placeholder = document.createElement('div');
      placeholder.className = 'label';
      placeholder.textContent = this.#emptyText;
      this.#container.append(placeholder);
      return;
    }
    this.#labels.forEach((label) => {
      let labelEl = document.createElement('span');
      labelEl.className = 'label';
      labelEl.textContent = `${label}${this.#labelPostfix}`;
      this.#container.append(labelEl);
      this.#labels.forEach((otherLabel) => {
        let labelEl = document.createElement('label');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        labelEl.append(checkbox);
        labelEl.append(otherLabel);
        this.#container.append(labelEl);
      });
    });
    this.#syncValueToInputs();
  }

  #syncValueToInputs() {
    let inputs = this.#container.querySelectorAll('input[type="checkbox"]');
    this.#value.flat().forEach((value, i) => {
      if (inputs[i]) {
        inputs[i].checked = value;
      }
    });
    this.#setHiddenFieldValue();
  }

  #syncValueFromInputs() {
    let inputs = this.#container.querySelectorAll('input[type="checkbox"]');
    let { length } = this.#labels;
    let values = [...inputs].map(input => input.checked);
    this.#value = Array.from({ length }, (_, rowIndex) =>
      values.slice(rowIndex * length, (rowIndex + 1) * length)
    );
    this.#setHiddenFieldValue();
  }

  #setHiddenFieldValue() {
    this.#hiddenField.value = this.stringValue;
  }
}
