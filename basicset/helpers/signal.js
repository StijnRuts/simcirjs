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

// Signal values use 1 and null
// other places in the code use 1 and 0, or true and false
// @TODO refactor

export const valueToBool = (v) => v !== null;
export const boolToValue = (v) => (v ? 1 : null);
export const valueToInt = (v) => (valueToBool(v) ? 1 : 0);
export const intToValue = (v) => boolToValue(v !== 0);
