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

export const createSwitchFactory = function (type) {
  return function (device) {
    const in1 = device.addInput();
    const out1 = device.addOutput();
    let on = type === "PushOff";

    if (type === "Toggle" && device.deviceDef.state) {
      on = device.deviceDef.state.on;
    }
    device.getState = function () {
      return type === "Toggle" ? { on: on } : null;
    };

    device.$ui.on("inputValueChange", function () {
      if (on) {
        out1.setValue(in1.getValue());
      }
    });

    const updateOutput = function () {
      out1.setValue(on ? in1.getValue() : null);
    };
    updateOutput();

    const super_createUI = device.createUI;
    device.createUI = function () {
      super_createUI();

      const size = device.getSize();

      let $button = $s.createSVGElement("rect").attr({
        x: size.width / 4,
        y: size.height / 4,
        width: size.width / 2,
        height: size.height / 2,
        rx: 2,
        ry: 2,
      });
      $button.addClass("simcir-basicset-switch-button");

      if (type === "Toggle" && on) {
        $button.addClass("simcir-basicset-switch-button-pressed");
      }

      device.$ui.append($button);

      const button_mouseDownHandler = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (type === "PushOn") {
          on = true;
          $button.addClass("simcir-basicset-switch-button-pressed");
        } else if (type === "PushOff") {
          on = false;
          $button.addClass("simcir-basicset-switch-button-pressed");
        } else if (type === "Toggle") {
          on = !on;
          $button.addClass("simcir-basicset-switch-button-pressed");
        }
        updateOutput();
        $(document).on("mouseup", button_mouseUpHandler);
        $(document).on("touchend", button_mouseUpHandler);
      };

      const button_mouseUpHandler = function () {
        if (type === "PushOn") {
          on = false;
          $button.removeClass("simcir-basicset-switch-button-pressed");
        } else if (type === "PushOff") {
          on = true;
          $button.removeClass("simcir-basicset-switch-button-pressed");
        } else if (type === "Toggle") {
          // keep state
          if (!on) {
            $button.removeClass("simcir-basicset-switch-button-pressed");
          }
        }
        updateOutput();
        $(document).off("mouseup", button_mouseUpHandler);
        $(document).off("touchend", button_mouseUpHandler);
      };

      device.$ui.on("deviceAdd", function () {
        $s.enableEvents($button, true);
        $button.on("mousedown", button_mouseDownHandler);
        $button.on("touchstart", button_mouseDownHandler);
      });
      device.$ui.on("deviceRemove", function () {
        $s.enableEvents($button, false);
        $button.off("mousedown", button_mouseDownHandler);
        $button.off("touchstart", button_mouseDownHandler);
      });
      device.$ui.addClass("simcir-basicset-switch");
    };
  };
};
