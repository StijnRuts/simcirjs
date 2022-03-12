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

import { BUF } from "./basicset/gates/BUF.js";
import { NOT } from "./basicset/gates/NOT.js";
import { AND } from "./basicset/gates/AND.js";
import { NAND } from "./basicset/gates/NAND.js";
import { OR } from "./basicset/gates/OR.js";
import { NOR } from "./basicset/gates/NOR.js";
import { XOR } from "./basicset/gates/XOR.js";
import { XNOR } from "./basicset/gates/XNOR.js";
import { EOR } from "./basicset/gates/EOR.js";
import { ENOR } from "./basicset/gates/ENOR.js";

import { DC } from "./basicset/inputs/DC.js";
import { PushOn } from "./basicset/inputs/PushOn.js";
import { PushOff } from "./basicset/inputs/PushOff.js";
import { Toggle } from "./basicset/inputs/Toggle.js";
import { OSC } from "./basicset/inputs/OSC.js";
import { RotaryEncoder } from "./basicset/inputs/RotaryEncoder.js";

import { LED } from "./basicset/outputs/LED.js";
import { LED_7seg } from "./basicset/outputs/LED_7seg.js";
import { LED_16seg } from "./basicset/outputs/LED_16seg.js";
import { LED_4bit7seg } from "./basicset/outputs/LED_4bit7seg.js";

import { BusIn } from "./basicset/bus/BusIn.js";
import { BusOut } from "./basicset/bus/BusOut.js";

simcir.registerDevice("BUF", BUF);
simcir.registerDevice("NOT", NOT);
simcir.registerDevice("AND", AND);
simcir.registerDevice("NAND", NAND);
simcir.registerDevice("OR", OR);
simcir.registerDevice("NOR", NOR);
simcir.registerDevice("XOR", XOR);
simcir.registerDevice("XNOR", XNOR);
// deprecated. not displayed in the default toolbox.
simcir.registerDevice("EOR", EOR, true);
simcir.registerDevice("ENOR", ENOR, true);

simcir.registerDevice("DC", DC);
simcir.registerDevice("PushOn", PushOn);
simcir.registerDevice("PushOff", PushOff);
simcir.registerDevice("Toggle", Toggle);
simcir.registerDevice("OSC", OSC);
simcir.registerDevice("RotaryEncoder", RotaryEncoder);

simcir.registerDevice("LED", LED);
simcir.registerDevice("7seg", LED_7seg);
simcir.registerDevice("16seg", LED_16seg);
simcir.registerDevice("4bit7seg", LED_4bit7seg);

simcir.registerDevice("BusIn", BusIn);
simcir.registerDevice("BusOut", BusOut);
