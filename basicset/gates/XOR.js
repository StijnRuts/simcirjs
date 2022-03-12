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
import { drawEOR, logicEOR } from "./EOR";
import { logicBUF } from "./BUF";

export const XOR = createLogicGateFactory(logicEOR, logicBUF, drawEOR);
