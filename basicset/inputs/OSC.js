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

import { createDoc } from "../helpers/doc";
import { boolToValue } from "../helpers/signal";

const params = [
  {
    name: "freq",
    type: "number",
    defaultValue: "2",
    description: "frequency of an oscillator.",
  },
];

export const OSC = (device) => {
  const freq = device.deviceDef.freq || 2;
  const output = device.addOutput();

  let timerId = null;
  let on = false;

  device.$ui.on("deviceAdd", () => {
    timerId = window.setInterval(() => {
      on = !on;
      output.setValue(boolToValue(on));
    }, 500 / freq);
  });

  device.$ui.on("deviceRemove", () => {
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  });

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();
    device.$ui.addClass("simcir-basicset-osc");
    device.doc = createDoc(device, params);
  };
};
