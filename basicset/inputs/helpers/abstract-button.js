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

import { boolToValue } from "../../helpers/signal";

const $s = simcir;

const setButtonClass = ($button, pressed) => {
  if (pressed) {
    $button.addClass("simcir-basicset-switch-button-pressed");
  } else {
    $button.removeClass("simcir-basicset-switch-button-pressed");
  }
};

const createUI = (device, getInitialValue, getValueOnDown, getValueOnUp) => {
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

  device.$ui.addClass("simcir-basicset-switch");
  device.$ui.append($button);

  const updateOutput = (pressed) => {
    setButtonClass($button, pressed);
    device.getOutputs()[0].setValue(boolToValue(pressed));
  };

  const downHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateOutput(getValueOnDown(device));
    $(document).on("mouseup", upHandler);
    $(document).on("touchend", upHandler);
  };

  const upHandler = () => {
    updateOutput(getValueOnUp(device));
    $(document).off("mouseup", upHandler);
    $(document).off("touchend", upHandler);
  };

  device.$ui.on("deviceAdd", () => {
    $s.enableEvents($button, true);
    updateOutput(getInitialValue(device));
    $button.on("mousedown", downHandler);
    $button.on("touchstart", downHandler);
  });

  device.$ui.on("deviceRemove", () => {
    $s.enableEvents($button, false);
    $button.off("mousedown", downHandler);
    $button.off("touchstart", downHandler);
    $(document).off("mouseup", upHandler);
    $(document).off("touchend", upHandler);
  });
};

export const createButton = (getInitialValue, getValueOnDown, getValueOnUp) => {
  return (device) => {
    device.addOutput();

    const super_createUI = device.createUI;
    device.createUI = () => {
      super_createUI();
      createUI(device, getInitialValue, getValueOnDown, getValueOnUp);
    };
  };
};
