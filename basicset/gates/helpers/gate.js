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

const $s = simcir;

import { intValue } from "../../helpers/signal";

export const createLogicGateFactory = function (op, out, draw) {
  return function (device) {
    const numInputs =
      op == null ? 1 : Math.max(2, device.deviceDef.numInputs || 2);
    device.halfPitch = numInputs > 2;

    for (let i = 0; i < numInputs; i += 1) {
      device.addInput();
    }
    device.addOutput();

    const inputs = device.getInputs();
    const outputs = device.getOutputs();

    device.$ui.on("inputValueChange", function () {
      let b = intValue(inputs[0].getValue());
      if (op != null) {
        for (let i = 1; i < inputs.length; i += 1) {
          b = op(b, intValue(inputs[i].getValue()));
        }
      }
      b = out(b);
      outputs[0].setValue(b === 1 ? 1 : null);
    });

    const super_createUI = device.createUI;
    device.createUI = function () {
      super_createUI();
      const size = device.getSize();
      let g = $s.graphics(device.$ui);
      g.attr["class"] = "simcir-basicset-symbol";
      draw(
        g,
        (size.width - $s.unit) / 2,
        (size.height - $s.unit) / 2,
        $s.unit,
        $s.unit
      );
      if (op != null) {
        device.doc = {
          params: [
            {
              name: "numInputs",
              type: "number",
              defaultValue: 2,
              description: "number of inputs.",
            },
          ],
          code: '{"type":"' + device.deviceDef.type + '","numInputs":2}',
        };
      }
    };
  };
};
