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

export const BusIn = function (device) {
  const numOutputs = Math.max(2, device.deviceDef.numOutputs || 8);

  device.halfPitch = true;

  device.addInput("", "x" + numOutputs);
  for (let i = 0; i < numOutputs; i += 1) {
    device.addOutput();
  }

  const extractValue = function (busValue, i) {
    return busValue != null &&
      typeof busValue === "object" &&
      typeof busValue[i] !== "undefined"
      ? busValue[i]
      : null;
  };

  device.$ui.on("inputValueChange", function () {
    const busValue = device.getInputs()[0].getValue();
    for (let i = 0; i < numOutputs; i += 1) {
      device.getOutputs()[i].setValue(extractValue(busValue, i));
    }
  });

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();
    device.doc = {
      params: [
        {
          name: "numOutputs",
          type: "number",
          defaultValue: 8,
          description: "number of outputs.",
        },
      ],
      code: '{"type":"' + device.deviceDef.type + '","numOutputs":8}',
    };
  };
};
