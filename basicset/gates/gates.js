//
// SimcirJS - basicset
//
// Copyright (c) 2014 Kazuhiko Arase
// Copyright (c) 2022 Stijn Ruts
//
// URLs:
//  http://www.d-project.com
//  https://kazuhikoarase.github.io/simcirjs
//  https://github.com/kazuhikoarase/simcirjs
//  https://github.com/StijnRuts/simcirjs
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

"use strict";

import { createGate } from "./helpers/abstract-gate";
import {
  drawBUF,
  drawNOT,
  drawAND,
  drawNAND,
  drawOR,
  drawNOR,
  drawXOR,
  drawXNOR,
} from "./helpers/draw";

const buf = (a) => (a === 1 ? 1 : 0);
const not = (a) => (a === 1 ? 0 : 1);

const and = (a, b) => a & b;
const or = (a, b) => a | b;
const xor = (a, b) => a ^ b;

export const BUF = createGate(null, buf, drawBUF);
export const NOT = createGate(null, not, drawNOT);
export const AND = createGate(and, buf, drawAND);
export const NAND = createGate(and, not, drawNAND);
export const OR = createGate(or, buf, drawOR);
export const NOR = createGate(or, not, drawNOR);
export const XOR = createGate(xor, buf, drawXOR);
export const XNOR = createGate(xor, not, drawXNOR);
