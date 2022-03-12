//
// SimcirJS - basicset
//
// Copyright (c) 2014 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

"use strict";

import { createLogicGateFactory } from "./helpers/gate";
import { logicBUF } from "./BUF";

export const logicAND = function (a, b) {
  return a & b;
};

export const drawAND = function (g, x, y, width, height) {
  g.moveTo(x, y);
  g.curveTo(x + width, y, x + width, y + height / 2);
  g.curveTo(x + width, y + height, x, y + height);
  g.lineTo(x, y);
  g.closePath(true);
};

export const AND = createLogicGateFactory(logicAND, logicBUF, drawAND);
