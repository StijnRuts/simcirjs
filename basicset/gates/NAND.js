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
import { drawAND, logicAND } from "./AND";
import { logicNOT } from "./NOT";

export const drawNAND = function (g, x, y, width, height) {
  drawAND(g, x - 1, y, width - 2, height);
  g.drawCircle(x + width - 1, y + height / 2, 2);
};

export const NAND = createLogicGateFactory(logicAND, logicNOT, drawNAND);
