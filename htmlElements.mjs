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

export const form = document.querySelector('form#knightsForm');
export const armyInput = form.querySelector('[name="army"]');
export const paletteInput = form.querySelector('[name="palette"]');
export const sizeInput = form.querySelector('[name="boardSize"]');
export const boardSizeInfo = form.querySelector('#board-size-info');
export const saveButton = document.querySelector('button#save');
export const randomArmyButton = document.getElementById('randomize-army');
export const randomEnmitiesButton = document.getElementById('randomize-enmities');
export const slider = document.getElementById('boardSize');
export const paletteInfo = document.getElementById('palette-info');
export const armyInfo = document.getElementById('army-info');
export const canvasContainer = document.querySelector('.canvas-container');
export const canvas = canvasContainer.querySelector('canvas');
export const checkboxGridContainer = document.querySelector('.grid-container');
