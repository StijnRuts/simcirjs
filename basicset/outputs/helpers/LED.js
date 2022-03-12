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

import { isHot } from "../../helpers/signal";
import { multiplyColor } from "./color";

const $s = simcir;

export const defaultLEDColor = "#ff0000";
export const defaultLEDBgColor = "#000000";

export const drawSeg = function (seg, g, pattern, hiColor, loColor, bgColor) {
  g.attr["stroke"] = "none";

  if (bgColor) {
    g.attr["fill"] = bgColor;
    g.drawRect(0, 0, seg.width, seg.height);
  }

  let on;
  for (let i = 0; i < seg.allSegments.length; i += 1) {
    const c = seg.allSegments.charAt(i);
    on = pattern != null && pattern.indexOf(c) !== -1;
    seg.drawSegment(g, c, on ? hiColor : loColor);
  }
  on = pattern != null && pattern.indexOf(".") !== -1;
  seg.drawPoint(g, on ? hiColor : loColor);
};

export const createSegUI = function (device, seg) {
  const size = device.getSize();
  const sw = seg.width;
  const sh = seg.height;
  const dw = size.width - $s.unit;
  const dh = size.height - $s.unit;
  const scale = sw / sh > dw / dh ? dw / sw : dh / sh;
  const tx = (size.width - seg.width * scale) / 2;
  const ty = (size.height - seg.height * scale) / 2;

  return $s
    .createSVGElement("g")
    .attr(
      "transform",
      "translate(" + tx + " " + ty + ")" + " scale(" + scale + ") "
    );
};

export const createLEDSegFactory = function (seg) {
  return function (device) {
    const hiColor = device.deviceDef.color || defaultLEDColor;
    const bgColor = device.deviceDef.bgColor || defaultLEDBgColor;
    const loColor = multiplyColor(hiColor, bgColor, 0.25);
    const allSegs = seg.allSegments + ".";

    device.halfPitch = true;
    for (let i = 0; i < allSegs.length; i += 1) {
      device.addInput();
    }

    const super_getSize = device.getSize;
    device.getSize = function () {
      const size = super_getSize();
      return { width: $s.unit * 4, height: size.height };
    };

    const super_createUI = device.createUI;
    device.createUI = function () {
      super_createUI();

      let $seg = createSegUI(device, seg);
      device.$ui.append($seg);

      const update = function () {
        let segs = "";
        for (let i = 0; i < allSegs.length; i += 1) {
          if (isHot(device.getInputs()[i].getValue())) {
            segs += allSegs.charAt(i);
          }
        }
        $seg.children().remove();
        drawSeg(seg, $s.graphics($seg), segs, hiColor, loColor, bgColor);
      };

      device.$ui.on("inputValueChange", update);
      update();

      device.doc = {
        params: [
          {
            name: "color",
            type: "string",
            defaultValue: defaultLEDColor,
            description: "color in hexadecimal.",
          },
          {
            name: "bgColor",
            type: "string",
            defaultValue: defaultLEDBgColor,
            description: "background color in hexadecimal.",
          },
        ],
        code:
          '{"type":"' +
          device.deviceDef.type +
          '","color":"' +
          defaultLEDColor +
          '"}',
      };
    };
  };
};

export const drawSegment = function (segmentData) {
  return function (g, segment, color) {
    if (!color) {
      return;
    }

    const data = segmentData[segment];
    const numPoints = data.length / 2;

    g.attr["fill"] = color;
    for (let i = 0; i < numPoints; i += 1) {
      const x = data[i * 2];
      const y = data[i * 2 + 1];
      if (i === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
    }
    g.closePath(true);
  };
};
