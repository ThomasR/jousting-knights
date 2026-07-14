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

const button = document.getElementById('save');

export default function () {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const canvas = document.querySelector('canvas#output');
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.download = button.dataset.filename;
      link.href = url;

      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  });
}
