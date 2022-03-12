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
import { multiplyColor } from "./helpers/color";
import { defaultLEDBgColor, defaultLEDColor } from "./helpers/LED";

const $s = simcir;

export const LED = function (device) {
  const in1 = device.addInput();

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();
    const hiColor = device.deviceDef.color || defaultLEDColor;
    const bgColor = device.deviceDef.bgColor || defaultLEDBgColor;
    const loColor = multiplyColor(hiColor, bgColor, 0.25);
    const bLoColor = multiplyColor(hiColor, bgColor, 0.2);
    const bHiColor = multiplyColor(hiColor, bgColor, 0.8);

    const size = device.getSize();

    const $ledbase = $s
      .createSVGElement("circle")
      .attr({ cx: size.width / 2, cy: size.height / 2, r: size.width / 4 })
      .attr("stroke", "none")
      .attr("fill", bLoColor);
    device.$ui.append($ledbase);

    const $led = $s
      .createSVGElement("circle")
      .attr({
        cx: size.width / 2,
        cy: size.height / 2,
        r: (size.width / 4) * 0.8,
      })
      .attr("stroke", "none")
      .attr("fill", loColor);
    device.$ui.append($led);

    device.$ui.on("inputValueChange", function () {
      $ledbase.attr("fill", isHot(in1.getValue()) ? bHiColor : bLoColor);
      $led.attr("fill", isHot(in1.getValue()) ? hiColor : loColor);
    });

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
