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

import { isHot } from "../helpers/signal";
import {
  createSegUI,
  defaultLEDBgColor,
  defaultLEDColor,
  drawSeg,
} from "./helpers/LED";
import { multiplyColor } from "./helpers/color";
import { _7Seg } from "./LED_7seg";

const $s = simcir;

const _PATTERNS = {
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

const getPattern = function (value) {
  return _PATTERNS["0123456789abcdef".charAt(value)];
};

export const LED_4bit7seg = function (device) {
  const hiColor = device.deviceDef.color || defaultLEDColor;
  const bgColor = device.deviceDef.bgColor || defaultLEDBgColor;
  const loColor = multiplyColor(hiColor, bgColor, 0.25);

  for (let i = 0; i < 4; i += 1) {
    device.addInput();
  }

  const super_getSize = device.getSize;
  device.getSize = function () {
    const size = super_getSize();
    return { width: $s.unit * 4, height: size.height };
  };

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();

    const seg = _7Seg;
    const $seg = createSegUI(device, seg);
    device.$ui.append($seg);

    const update = function () {
      let value = 0;
      for (let i = 0; i < 4; i += 1) {
        if (isHot(device.getInputs()[i].getValue())) {
          value += 1 << i;
        }
      }
      $seg.children().remove();
      drawSeg(
        seg,
        $s.graphics($seg),
        getPattern(value),
        hiColor,
        loColor,
        bgColor
      );
    };

    device.$ui.on("inputValueChange", update);
    update();

    device.doc = {
      params: [
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
      ],
      code:
        '{"type":"' +
        device.deviceDef.type +
        '","color":"' +
        defaultLEDColor +
        '"}',
    };
  };
};
