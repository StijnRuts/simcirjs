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
import { drawOR, logicOR } from "./OR";
import { logicNOT } from "./NOT";

export const drawNOR = function (g, x, y, width, height) {
  drawOR(g, x - 1, y, width - 2, height);
  g.drawCircle(x + width - 1, y + height / 2, 2);
};

export const NOR = createLogicGateFactory(logicOR, logicNOT, drawNOR);
