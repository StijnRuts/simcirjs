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

import { boolToValue } from "../helpers/signal";
import { createDoc } from "../helpers/doc";

const $s = simcir;

const MIN_ANGLE = 45;
const MAX_ANGLE = 315;

const modulo = (a, n) => ((a % n) + n) % n;

const pointToAngle = (x, y) => {
  const theta = Math.atan2(y, x);
  const angle = (180 * (theta - Math.PI / 2)) / Math.PI;
  return modulo(angle, 360);
};

const params = [
  {
    name: "numOutputs",
    type: "number",
    defaultValue: 4,
    description: "number of outputs.",
  },
];

export const RotaryEncoder = (device) => {
  const numOutputs = Math.max(2, device.deviceDef.numOutputs || 4);
  device.halfPitch = numOutputs > 4;

  for (let i = 0; i < numOutputs; i += 1) {
    device.addOutput();
  }

  const super_getSize = device.getSize;
  device.getSize = () => {
    const size = super_getSize();
    return { width: $s.unit * 4, height: size.height };
  };

  const super_createUI = device.createUI;
  device.createUI = () => {
    super_createUI();

    const size = device.getSize();
    const r = (1.5 * Math.min(size.width, size.height)) / 4;

    let _angle = MIN_ANGLE;

    const $knob = $s
      .createSVGElement("g")
      .attr("class", "simcir-basicset-knob");

    let g = $s.graphics($knob);
    g.drawCircle(0, 0, r);
    g.attr["class"] = "simcir-basicset-knob-mark";
    g.moveTo(0, 0);
    g.lineTo(r, 0);
    g.closePath();

    device.$ui.append($knob);

    const update = () => {
      $s.transform($knob, size.width / 2, size.height / 2, _angle + 90);
      const max = 1 << numOutputs;
      const value = Math.min(
        (max * (_angle - MIN_ANGLE)) / (MAX_ANGLE - MIN_ANGLE),
        max - 1
      );
      for (let i = 0; i < numOutputs; i++) {
        const bit = value & (1 << i);
        device.getOutputs()[i].setValue(boolToValue(bit));
      }
    };
    update();

    const setAngle = (angle) => {
      _angle = Math.max(MIN_ANGLE, Math.min(angle, MAX_ANGLE));
      update();
    };

    const mouseDownHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      mouseMoveHandler(event);
      $(document).on("mousemove", mouseMoveHandler);
      $(document).on("mouseup", mouseUpHandler);
    };

    const mouseUpHandler = () => {
      $(document).off("mousemove", mouseMoveHandler);
      $(document).off("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (event) => {
      const off = $knob.parent("svg").offset();
      const pos = $s.offset($knob);
      const cx = off.left + pos.x;
      const cy = off.top + pos.y;
      const dx = event.pageX - cx;
      const dy = event.pageY - cy;
      if (dx === 0 && dy === 0) {
        return;
      }
      setAngle(pointToAngle(dx, dy));
    };

    device.$ui.on("deviceAdd", () => {
      $s.enableEvents($knob, true);
      $knob.on("mousedown", mouseDownHandler);
    });

    device.$ui.on("deviceRemove", () => {
      $s.enableEvents($knob, false);
      $knob.off("mousedown", mouseDownHandler);
    });

    device.doc = createDoc(device, params);
  };
};
