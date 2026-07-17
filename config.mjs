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

export const nnbsp = '\u{0202F}';

export const titleTemplate = 'Jousting {{army}}';

export const boardSizes = [
  500,
  4_000,
  30_000,
  250_000,
  2_000_000,
  16_000_000,
  100_000_000
];

export const defaultBoardSizeIndex = 3;
export const minRandomArmySize = 2;
export const maxRandomArmySize = 5;

export const colors = {
  black: [0, 0, 0],
  blue: [8, 114, 192],
  cyan: [0, 204, 201],
  gold: [255, 210, 0],
  green: [0, 140, 52],
  lime: [0, 240, 20],
  orange: [255, 162, 58],
  pink: [255, 137, 208],
  purple: [139, 11, 177],
  red: [247, 46, 31],
  silver: [209, 212, 216],
  white: [255, 255, 255],
  yellow: [255, 255, 22]
};

export const defaultPalette = 'white red blue gold green cyan black pink lime purple silver';

export const paintThresholds = {
  minBoardSize: 500_000,
  initialPaint: 100_000,
  maxPaint: 10_000_000
};
