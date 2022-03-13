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

import { valueToBool } from "../helpers/signal";
import {
  segmentsUI,
  defaultLEDBgColor,
  defaultLEDColor,
  drawSegmentsPattern,
} from "./helpers/LED";
import { multiplyColor } from "./helpers/color";
import { _7segments } from "./LED_7seg";
import { createDoc } from "../helpers/doc";

const $s = simcir;

/**
 *  a
 * f b
 *  g
 * e c
 *  d
 */
const PATTERNS = {
  0: "abcdef",
  1: "bc",
  2: "abdeg",
  3: "abcdg",
  4: "bcfg",
  5: "acdfg",
  6: "acdefg",
  7: "abc",
  8: "abcdefg",
  9: "abcdfg",
  a: "abcefg",
  b: "cdefg",
  c: "adef",
  d: "bcdeg",
  e: "adefg",
  f: "aefg",
};

const getPattern = (value) => {
  return PATTERNS["0123456789abcdef".charAt(value)];
};

const params = [
  {
    name: "color",
    type: "string",
    defaultValue: defaultLEDColor,
    description: "color in hexadecimal.",
  },
  {
    name: "bgColor",
    type: "string",
    defaultValue: defaultLEDBgColor,
    description: "background color in hexadecimal.",
  },
];

export const LED_4bit7seg = (device) => {
  const bgColor = device.deviceDef.bgColor || defaultLEDBgColor;
  const onColor = device.deviceDef.color || defaultLEDColor;
  const offColor = multiplyColor(onColor, bgColor, 0.25);

  for (let i = 0; i < 4; i++) {
    device.addInput();
  }

  const super_getSize = device.getSize;
  device.getSize = () => {
    const size = super_getSize();
    return { width: $s.unit * 4, height: size.height };
  };

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();

    const segments = _7segments;
    const $seg = segmentsUI(device, segments);
    device.$ui.append($seg);

    const getInputValue = () => {
      let value = 0;
      for (let i = 0; i < 4; i++) {
        if (valueToBool(device.getInputs()[i].getValue())) {
          value += 1 << i;
        }
      }
      return value;
    };

    const update = () => {
      $seg.children().remove();
      drawSegmentsPattern(
        $s.graphics($seg),
        segments,
        getPattern(getInputValue()),
        onColor,
        offColor,
        bgColor
      );
    };

    device.$ui.on("inputValueChange", update);
    update();

    device.doc = createDoc(device, params);
  };
};
