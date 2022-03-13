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

const $s = simcir;

const createConst = (label, value) => {
  return (device) => {
    device.addOutput();

    device.$ui.on("deviceAdd", () => {
      device.getOutputs()[0].setValue(value);
    });

    device.$ui.on("deviceRemove", () => {
      device.getOutputs()[0].setValue(null);
    });

    const super_createUI = device.createUI;
    device.createUI = () => {
      super_createUI();
      device.$ui.addClass("simcir-basicset-const" + label);

      const size = device.getSize();
      const fontSize = 18;

      const $label = $s
        .createSVGElement("text")
        .text(label)
        .attr({
          x: size.width / 2 - fontSize * 0.25,
          y: size.height / 2 + fontSize * 0.35,
        })
        .addClass("simcir-basicset-const-label")
        .css("font-size", fontSize + "px")
        .css("font-family", "monospace");

      device.$ui.append($label);
    };
  };
};

export const Const0 = createConst("0", null);
export const Const1 = createConst("1", 1);
