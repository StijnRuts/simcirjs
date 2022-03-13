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

import { createButton } from "./helpers/abstract-button";

const getInitialValue = () => false;
const getValueOnDown = () => true;
const getValueOnUp = () => false;

export const PushOn = createButton(
  getInitialValue,
  getValueOnDown,
  getValueOnUp
);
