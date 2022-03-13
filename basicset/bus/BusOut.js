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

import { valueToBool } from "../helpers/signal";
import { createDoc } from "../helpers/doc";

const params = [
  {
    name: "numInputs",
    type: "number",
    defaultValue: 8,
    description: "number of inputs.",
  },
];

export const BusOut = (device) => {
  const numInputs = Math.max(2, device.deviceDef.numInputs || 8);
  device.halfPitch = true;

  for (let i = 0; i < numInputs; i++) {
    device.addInput();
  }
  device.addOutput("", "x" + numInputs);

  device.$ui.on("inputValueChange", () => {
    let busValue = [];
    let hotCount = 0;
    for (let i = 0; i < numInputs; i++) {
      const value = device.getInputs()[i].getValue();
      if (valueToBool(value)) {
        hotCount += 1;
      }
      busValue.push(value);
    }
    device.getOutputs()[0].setValue(hotCount > 0 ? busValue : null);
  });

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();
    device.doc = createDoc(device, params);
  };
};
