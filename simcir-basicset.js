//
// SimcirJS - basicset
//
// Copyright (c) 2014 Kazuhiko Arase
// Copyright (c) 2022 Stijn Ruts
//
// URLs:
//  http://www.d-project.com
//  https://kazuhikoarase.github.io/simcirjs
//  https://github.com/kazuhikoarase/simcirjs
//  https://github.com/StijnRuts/simcirjs
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

"use strict";

import {
  BUF,
  NOT,
  AND,
  NAND,
  OR,
  NOR,
  XOR,
  XNOR,
} from "./basicset/gates/gates.js";

import { Const0, Const1 } from "./basicset/inputs/Const.js";
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

simcir.registerDevice("Const0", Const0);
simcir.registerDevice("Const1", Const1);
simcir.registerDevice("PushOn", PushOn);
simcir.registerDevice("PushOff", PushOff);
simcir.registerDevice("Toggle", Toggle);
simcir.registerDevice("LED", LED);

simcir.registerDevice("BUF", BUF);
simcir.registerDevice("NOT", NOT);
simcir.registerDevice("AND", AND);
simcir.registerDevice("NAND", NAND);
simcir.registerDevice("OR", OR);
simcir.registerDevice("NOR", NOR);
simcir.registerDevice("XOR", XOR);
simcir.registerDevice("XNOR", XNOR);

simcir.registerDevice("OSC", OSC);
simcir.registerDevice("RotaryEncoder", RotaryEncoder);

simcir.registerDevice("7seg", LED_7seg);
simcir.registerDevice("16seg", LED_16seg);
simcir.registerDevice("4bit7seg", LED_4bit7seg);

simcir.registerDevice("BusIn", BusIn);
simcir.registerDevice("BusOut", BusOut);
