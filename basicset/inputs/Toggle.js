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

import { createButton } from "./helpers/abstract-button";

const defaultState = { pressed: false };

const isPressed = (device) => device.state.pressed;

const toggle = (device) => (device.state.pressed = !isPressed(device));

const getInitialValue = (device) => {
  device.state = { ...defaultState, ...device.deviceDef.state };

  device.getState = () => {
    return device.state;
  };

  return isPressed(device);
};

const getValueOnDown = (device) => {
  toggle(device);
  return isPressed(device);
};

const getValueOnUp = (device) => {
  return isPressed(device);
};

export const Toggle = createButton(
  getInitialValue,
  getValueOnDown,
  getValueOnUp
);
