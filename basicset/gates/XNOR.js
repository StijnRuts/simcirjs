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
import { logicEOR } from "./EOR";
import { logicNOT } from "./NOT";
import { drawENOR } from "./ENOR";

export const XNOR = createLogicGateFactory(logicEOR, logicNOT, drawENOR);
