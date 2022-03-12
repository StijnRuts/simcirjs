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
import { drawBUF } from "./BUF";

export const logicNOT = function (a) {
  return a === 1 ? 0 : 1;
};

export const drawNOT = function (g, x, y, width, height) {
  drawBUF(g, x - 1, y, width - 2, height);
  g.drawCircle(x + width - 1, y + height / 2, 2);
};

export const NOT = createLogicGateFactory(null, logicNOT, drawNOT);
