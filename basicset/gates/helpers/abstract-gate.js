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

import { createDoc } from "../../helpers/doc";

const $s = simcir;

import { valueToInt, intToValue } from "../../helpers/signal";

const params = [
  {
    name: "numInputs",
    type: "number",
    defaultValue: 2,
    description: "number of inputs.",
  },
];

export const createGate = (inputsTransform, outputTransform, draw) => {
  return (device) => {
    const numInputs =
      inputsTransform === null
        ? 1
        : Math.max(2, device.deviceDef.numInputs || 2);
    device.halfPitch = numInputs > 2;

    for (let i = 0; i < numInputs; i++) {
      device.addInput();
    }
    device.addOutput();

    device.$ui.on("inputValueChange", () => {
      const values = device
        .getInputs()
        .map((input) => valueToInt(input.getValue()));
      let result = values.pop();

      if (inputsTransform !== null) {
        result = values.reduce(inputsTransform, result);
      }
      result = outputTransform(result);

      device.getOutputs()[0].setValue(intToValue(result));
    });

    const super_createUI = device.createUI;
    device.createUI = () => {
      super_createUI();

      let g = $s.graphics(device.$ui);
      g.attr["class"] = "simcir-basicset-symbol";

      const size = device.getSize();
      draw(
        g,
        (size.width - $s.unit) / 2,
        (size.height - $s.unit) / 2,
        $s.unit,
        $s.unit
      );

      if (numInputs > 1) {
        device.doc = createDoc(device, params);
      }
    };
  };
};
