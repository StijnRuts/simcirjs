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

const _MIN_ANGLE = 45;
const _MAX_ANGLE = 315;

const thetaToAngle = function (theta) {
  let angle = (180 * (theta - Math.PI / 2)) / Math.PI;
  while (angle < 0) {
    angle += 360;
  }
  while (angle > 360) {
    angle -= 360;
  }
  return angle;
};

export const RotaryEncoder = function (device) {
  const numOutputs = Math.max(2, device.deviceDef.numOutputs || 4);
  device.halfPitch = numOutputs > 4;

  device.addInput();
  for (let i = 0; i < numOutputs; i += 1) {
    device.addOutput();
  }

  const super_getSize = device.getSize;
  device.getSize = function () {
    const size = super_getSize();
    return { width: $s.unit * 4, height: size.height };
  };

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();
    const size = device.getSize();

    const $knob = $s
      .createSVGElement("g")
      .attr("class", "simcir-basicset-knob")
      .append(
        $s
          .createSVGElement("rect")
          .attr({ x: -10, y: -10, width: 20, height: 20 })
      );

    const r = (1.5 * Math.min(size.width, size.height)) / 4;

    let g = $s.graphics($knob);
    g.drawCircle(0, 0, r);
    g.attr["class"] = "simcir-basicset-knob-mark";
    g.moveTo(0, 0);
    g.lineTo(r, 0);
    g.closePath();
    device.$ui.append($knob);

    let _angle = _MIN_ANGLE;
    const setAngle = function (angle) {
      _angle = Math.max(_MIN_ANGLE, Math.min(angle, _MAX_ANGLE));
      update();
    };

    let dragPoint = null;
    const knob_mouseDownHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();
      dragPoint = { x: event.pageX, y: event.pageY };
      $(document).on("mousemove", knob_mouseMoveHandler);
      $(document).on("mouseup", knob_mouseUpHandler);
    };

    const knob_mouseMoveHandler = function (event) {
      const off = $knob.parent("svg").offset();
      const pos = $s.offset($knob);
      const cx = off.left + pos.x;
      const cy = off.top + pos.y;
      const dx = event.pageX - cx;
      const dy = event.pageY - cy;
      if (dx === 0 && dy === 0) {
        return;
      }
      setAngle(thetaToAngle(Math.atan2(dy, dx)));
    };

    const knob_mouseUpHandler = function () {
      $(document).off("mousemove", knob_mouseMoveHandler);
      $(document).off("mouseup", knob_mouseUpHandler);
    };

    device.$ui.on("deviceAdd", function () {
      $s.enableEvents($knob, true);
      $knob.on("mousedown", knob_mouseDownHandler);
    });
    device.$ui.on("deviceRemove", function () {
      $s.enableEvents($knob, false);
      $knob.off("mousedown", knob_mouseDownHandler);
    });

    const update = function () {
      $s.transform($knob, size.width / 2, size.height / 2, _angle + 90);
      const max = 1 << numOutputs;
      const value = Math.min(
        (max * (_angle - _MIN_ANGLE)) / (_MAX_ANGLE - _MIN_ANGLE),
        max - 1
      );
      for (let i = 0; i < numOutputs; i += 1) {
        device
          .getOutputs()
          [i].setValue(
            value & (1 << i) ? device.getInputs()[0].getValue() : null
          );
      }
    };

    device.$ui.on("inputValueChange", update);
    update();

    device.doc = {
      params: [
        {
          name: "numOutputs",
          type: "number",
          defaultValue: 4,
          description: "number of outputs.",
        },
      ],
      code: '{"type":"' + device.deviceDef.type + '","numOutputs":4}',
    };
  };
};
