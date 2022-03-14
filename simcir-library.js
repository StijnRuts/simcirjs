//
// SimcirJS - library
//
// Copyright (c) 2014 Kazuhiko Arase
//
// URLs:
//  http://www.d-project.com
//  https://kazuhikoarase.github.io/simcirjs
//  https://github.com/kazuhikoarase/simcirjs
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

import RS_FF from "./library/RS-FF.json5";
import JK_FF from "./library/JK-FF.json5";
import T_FF from "./library/T-FF.json5";
import D_FF from "./library/D-FF.json5";
import _8bitCounter from "./library/8bitCounter.json5";
import HalfAdder from "./library/HalfAdder.json5";
import FullAdder from "./library/FullAdder.json5";
import _4bitAdder from "./library/4bitAdder.json5";
import _2to4BinaryDecoder from "./library/2to4BinaryDecoder.json5";
import _3to8BinaryDecoder from "./library/3to8BinaryDecoder.json5";
import _4to16BinaryDecoder from "./library/4to16BinaryDecoder.json5";

simcir.registerDevice("RS-FF", RS_FF);
simcir.registerDevice("JK-FF", JK_FF);
simcir.registerDevice("T-FF", T_FF);
simcir.registerDevice("D-FF", D_FF);
simcir.registerDevice("8bitCounter", _8bitCounter);
simcir.registerDevice("HalfAdder", HalfAdder);
simcir.registerDevice("FullAdder", FullAdder);
simcir.registerDevice("4bitAdder", _4bitAdder);
simcir.registerDevice("2to4BinaryDecoder", _2to4BinaryDecoder);
simcir.registerDevice("3to8BinaryDecoder", _3to8BinaryDecoder);
simcir.registerDevice("4to16BinaryDecoder", _4to16BinaryDecoder);
