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
import { drawOR } from "./OR";
import { logicBUF } from "./BUF";

export const logicEOR = function (a, b) {
  return a ^ b;
};

export const drawEOR = function (g, x, y, width, height) {
  drawOR(g, x + 3, y, width - 3, height);
  const depth = (width - 3) * 0.2;
  g.moveTo(x, y + height);
  g.curveTo(x + depth, y + height, x + depth, y + height / 2);
  g.curveTo(x + depth, y, x, y);
  g.closePath();
};

export const EOR = createLogicGateFactory(logicEOR, logicBUF, drawEOR);
