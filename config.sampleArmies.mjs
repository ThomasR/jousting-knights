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

let myArmies = [
  ['alfil dromedary dabbaba', 'black red cyan yellow'],
  ['alfil ferz giraffe antelope', 'white red blue gold green'],
  ['alfil giraffe wazir antelope zebra', 'black yellow cyan red lime pink'],
  ['antelope antelope wazir', 'white cyan orange purple'],
  ['antelope camel knight', 'white cyan purple gold'],
  ['antelope camel', 'white blue red'],
  ['antelope giraffe dabbaba', 'white blue black gold'],
  ['antelope giraffe giraffe', 'white purple black cyan'],
  ['antelope wazir dabbaba dabbaba', 'black yellow lime pink orange'],
  // ['antelope zebra giraffe', 'black pink cyan gold'],
  ['antelope zebra zebra camel', 'white red black blue gold'],
  ['camel', 'blue gold'],
  ['camel antelope camel', 'white red blue gold'],
  ['camel antelope dromedary zebra', 'black red blue orange white', '0101 1110 0001 1010'],
  ['camel giraffe alfil', 'white red black blue'],
  ['camel giraffe dabbaba', 'white gold black red'],
  ['camel stag stag', 'silver black blue cyan', '010 001 100'],
  // ['camel camel knight camel', 'white blue red gold green'],
  // ['camel knight camel knight', 'white red green gold blue'],
  // ['camel zebra antelope antelope', 'black red cyan gold lime'],
  ['camel zebra stag', 'white lime red black'],
  ['dabbaba antelope zebra eland', 'white black red blue lime', '1100 1010 0001 0110'],
  ['dabbaba knight eland eland', 'white black red blue lime', '0011 1010 1001 1000'],
  ['dabbaba knight giraffe', 'white red gold blue'],
  ['dabbaba wazir zebra', 'white red yellow black'],
  ['dabbaba zebra eland giraffe', 'white blue lime red gold', '1001 1010 1100 1001'],
  ['dromedary alfil', 'white blue purple'],
  ['dromedary alfil knight wazir', 'white red blue gold lime'],
  ['dromedary dabbaba ferz camel', 'white red blue green gold'],
  ['dromedary dromedary', 'white orange black'],
  // ['dromedary dromedary dabbaba knight', 'black lime blue yellow red'],
  ['dromedary dromedary knight antelope alfil', 'white red blue gold green orange'],
  ['dromedary ferz', 'white blue gold'],
  ['dromedary zebra', 'white blue black'],
  ['dromedary zebra antelope', 'white red black green'],
  ['eland eland camel', 'gold red black orange', '001 101 010'],
  ['eland giraffe camel wazir', 'white red blue gold green', '0101 1011 0011 1101'],
  ['eland stag wazir dromedary', 'white black red purple blue', '0111 1001 0010 1011'],
  ['ferz antelope dabbaba', 'black yellow blue red'],
  ['ferz camel dabbaba wazir', 'white red black yellow purple'],
  ['ferz dabbaba antelope', 'black red yellow cyan'],
  ['ferz stag alfil', 'white black red blue', '001 100 011'],
  ['ferz wazir stag zebra camel', 'white red blue lime purple orange'],
  ['ferz zebra ferz antelope', 'yellow red orange gold black', '0100 1001 0111 0110'],
  ['giraffe antelope', 'black red gold'],
  ['giraffe camel alfil', 'white gold black blue', '010 001 110'],
  //['giraffe camel zebra camel antelope', 'white red orange blue green gold'],
  ['giraffe dromedary camel', 'white red lime blue'],
  ['giraffe dromedary eland', 'white blue cyan lime', '001 010 010'],
  ['giraffe eland camel', 'white red gold black', '011 001 100'],
  ['giraffe zebra dabbaba', 'black gold red cyan'],
  ['giraffe zebra dabbaba camel wazir', 'white red black blue cyan gold'],
  ['giraffe zebra knight', 'gold black red blue', '010 001 110'],
  // ['knight alfil dabbaba wazir', 'white red blue gold black'],
  ['knight camel dabbaba ferz', 'white red yellow blue lime', '0111 0100 1000 1101'],
  ['knight dromedary wazir camel', 'white blue pink black red'],
  ['knight eland dromedary dabbaba', 'white red black silver yellow', '0111 1011 1000 1010'],
  // ['knight alfil camel', 'white blue red gold'],
  ['knight stag stag wazir', 'black red gold pink cyan'],
  ['knight wazir antelope knight', 'white red green purple blue'],
  ['knight zebra eland', 'white red blue lime'],
  ['stag', 'black red'],
  ['stag antelope zebra giraffe', 'white red blue gold green'],
  ['stag camel dabbaba knight', 'white black red blue green', '1001 0001 1010 0101'],
  ['stag ferz eland dabbaba', 'black red blue lime yellow', '0101 0011 1101 1111'],
  //['stag ferz giraffe ferz', 'white silver black yellow red', '0011 0010 1000 1000'],
  ['stag stag antelope camel', 'white red black blue yellow', '0100 1011 0101 1100'],
  // ['stag giraffe stag camel', 'black blue red yellow lime'],
  ['wazir antelope zebra dabbaba', 'white yellow blue red black'],
  // ['wazir camel dabbaba', 'white blue red gold'],
  ['wazir camel stag', 'black red yellow lime'],
  ['wazir dabbaba zebra', 'white gold black red'],
  ['wazir dromedary ferz zebra', 'white lime blue gold red'],
  ['wazir ferz dabbaba', 'red black cyan white'],
  // ['wazir knight zebra camel', 'white black red gold blue'],
  ['wazir zebra', 'white cyan red'],
  ['zebra antelope alfil', 'white black gold purple', '100 101 110'],
  ['zebra camel', 'white cyan purple'],
  ['zebra ferz dromedary dabbaba', 'white red blue yellow pink'],
  ['zebra ferz stag zebra', 'black blue cyan red yellow', '0111 1100 0111 0101'],
  // ['zebra giraffe camel camel', 'white blue red gold black'],
  ['zebra stag', 'white red black'],
  // ['zebra stag giraffe', 'black cyan red yellow'],
  ['zebra wazir zebra knight dabbaba', 'black red blue gold green pink']
];
// Presented in the Numberphile videos:
let numberphileArmies = [
  ['knight', 'white black'],
  ['knight knight', 'white black red'],
  ['knight knight knight', 'white black red cyan'],
  ['knight knight knight knight', 'white blue red pink cyan'],
  ['knight knight knight knight knight', 'white blue purple pink orange yellow'],
  ['alfil dromedary', 'white black gold'],
  ['knight antelope', 'white black cyan'],
  ['knight dabbaba wazir wazir', 'white black red cyan purple'],
  ['knight zebra', 'white black red'],
  ['wazir ferz wazir ferz', 'white black red cyan purple']
];

let jonkaArmies = [
  ['alfil wazir antelope', 'white black red cyan', '010 001 010'],
  ['knight eland wazir', 'white black red cyan', '011 001 100'],
  ['camel zebra alfil', 'red white black silver', '001 101 000'],
  ['knight wazir camel', 'white black red cyan', '001 100 110'],
  ['knight wazir camel', 'white black red cyan', '010 001 110'],
  ['knight wazir camel', 'white black red cyan', '000 001 010'],
  ['knight wazir camel', 'white black red cyan', '001 001 010'],
  ['wazir camel knight camel', 'white lime red green pink', '0111 1000 0101 1000'],
  ['knight wazir camel', 'white black red cyan', '010 101 010'],
  ['wazir alfil ferz zebra', 'lime black red gold white', '0001 0000 1001 1010'],
  ['wazir dabbaba', 'white black red']
];

const sampleSorter = ([a], [b]) => (a.split(' ').length - b.split(' ').length) || (a < b ? -1 : 1);

export default [{
  label: 'Samples with default enmities',
  values: myArmies.filter(x => x.length === 2).sort(sampleSorter)
}, {
  label: 'Samples with custom enmities',
  values: myArmies.filter(x => x.length === 3).sort(sampleSorter)
}, {
  label: 'Presented on Numberphile',
  values: numberphileArmies,
  open: true
}, {
  label: 'By Jonas Karlsson (jonka364.github.io)',
  values: jonkaArmies
}];
