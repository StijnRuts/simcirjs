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

export const logicOR = function (a, b) {
  return a | b;
};

export const drawOR = function (g, x, y, width, height) {
  const depth = width * 0.2;
  g.moveTo(x, y);
  g.curveTo(x + width - depth, y, x + width, y + height / 2);
  g.curveTo(x + width - depth, y + height, x, y + height);
  g.curveTo(x + depth, y + height, x + depth, y + height / 2);
  g.curveTo(x + depth, y, x, y);
  g.closePath(true);
};

export const OR = createLogicGateFactory(logicOR, logicBUF, drawOR);
