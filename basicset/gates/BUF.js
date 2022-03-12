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

export const logicBUF = function (a) {
  return a === 1 ? 1 : 0;
};

export const drawBUF = function (g, x, y, width, height) {
  g.moveTo(x, y);
  g.lineTo(x + width, y + height / 2);
  g.lineTo(x, y + height);
  g.lineTo(x, y);
  g.closePath(true);
};

export const BUF = createLogicGateFactory(null, logicBUF, drawBUF);
