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

import { createDoc } from "../helpers/doc";

const params = [
  {
    name: "numOutputs",
    type: "number",
    defaultValue: 8,
    description: "number of outputs.",
  },
];

export const BusIn = (device) => {
  const numOutputs = Math.max(2, device.deviceDef.numOutputs || 8);
  device.halfPitch = true;

  device.addInput("", "x" + numOutputs);
  for (let i = 0; i < numOutputs; i++) {
    device.addOutput();
  }

  device.$ui.on("inputValueChange", () => {
    const extractValue = (busValue, i) => {
      return busValue != null &&
        typeof busValue === "object" &&
        typeof busValue[i] !== "undefined"
        ? busValue[i]
        : null;
    };

    const busValue = device.getInputs()[0].getValue();
    for (let i = 0; i < numOutputs; i++) {
      device.getOutputs()[i].setValue(extractValue(busValue, i));
    }
  });

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();
    device.doc = createDoc(device, params);
  };
};
