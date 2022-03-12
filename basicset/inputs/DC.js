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

export const DC = function (device) {
  device.addOutput();

  const super_createUI = device.createUI;
  device.createUI = function () {
    super_createUI();
    device.$ui.addClass("simcir-basicset-dc");
  };

  device.$ui.on("deviceAdd", function () {
    device.getOutputs()[0].setValue(1);
  });
  device.$ui.on("deviceRemove", function () {
    device.getOutputs()[0].setValue(null);
  });
};
