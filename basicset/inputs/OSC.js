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

export const OSC = function (device) {
  const freq = device.deviceDef.freq || 10;
  const delay = ~~(500 / freq);
  const out1 = device.addOutput();

  let timerId = null;
  let on = false;

  device.$ui.on("deviceAdd", function () {
    timerId = window.setInterval(function () {
      out1.setValue(on ? 1 : null);
      on = !on;
    }, delay);
  });
  device.$ui.on("deviceRemove", function () {
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  });

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();
    device.$ui.addClass("simcir-basicset-osc");
    device.doc = {
      params: [
        {
          name: "freq",
          type: "number",
          defaultValue: "10",
          description: "frequency of an oscillator.",
        },
      ],
      code: '{"type":"' + device.deviceDef.type + '","freq":10}',
    };
  };
};
