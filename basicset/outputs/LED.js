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
import { defaultLEDBgColor, defaultLEDColor } from "./helpers/LED";
import { createDoc } from "../helpers/doc";

const $s = simcir;

const params = [
  {
    name: "onColor",
    type: "string",
    defaultValue: defaultLEDColor,
    description: "color when LED is on, in hexadecimal.",
  },
  {
    name: "offColor",
    type: "string",
    defaultValue: defaultLEDBgColor,
    description: "color when LED is off, in hexadecimal.",
  },
];

export const LED = (device) => {
  const input = device.addInput();

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();

    const onColor = device.deviceDef.onColor || defaultLEDColor;
    const offColor = device.deviceDef.offColor || defaultLEDBgColor;

    const size = device.getSize();

    const $led = $s
      .createSVGElement("circle")
      .attr({
        cx: size.width / 2,
        cy: size.height / 2,
        r: (size.width / 2) * 0.6,
      })
      .attr("stroke", "none")
      .attr("fill", offColor);
    device.$ui.append($led);

    device.$ui.on("inputValueChange", () => {
      $led.attr("fill", valueToBool(input.getValue()) ? onColor : offColor);
    });

    device.doc = createDoc(device, params);
  };
};
