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

import { valueToBool } from "../../helpers/signal";
import { multiplyColor } from "./color";
import { createDoc } from "../../helpers/doc";

const $s = simcir;

export const defaultLEDColor = "#ff0000";
export const defaultLEDBgColor = "#000000";

export const drawSegment = (segmentData) => {
  return (g, segment, color) => {
    if (!color) {
      return;
    }

    const data = segmentData[segment];
    const numPoints = data.length / 2;

    g.attr["fill"] = color;
    for (let i = 0; i < numPoints; i++) {
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

export const drawSegmentsPattern = (
  g,
  segments,
  pattern,
  onColor,
  offColor,
  bgColor
) => {
  g.attr["stroke"] = "none";

  if (bgColor) {
    g.attr["fill"] = bgColor;
    g.drawRect(0, 0, segments.width, segments.height);
  }

  for (let i = 0; i < segments.allSegments.length; i++) {
    const char = segments.allSegments.charAt(i);
    const isSegmentOn = pattern != null && pattern.indexOf(char) !== -1;
    segments.drawSegment(g, char, isSegmentOn ? onColor : offColor);
  }

  const isPointOn = pattern != null && pattern.indexOf(".") !== -1;
  segments.drawPoint(g, isPointOn ? onColor : offColor);
};

export const segmentsUI = (device, seg) => {
  const size = device.getSize();
  const sw = seg.width;
  const sh = seg.height;
  const dw = size.width - $s.unit;
  const dh = size.height - $s.unit;
  const scale = sw / sh > dw / dh ? dw / sw : dh / sh;
  const x = (size.width - seg.width * scale) / 2;
  const y = (size.height - seg.height * scale) / 2;

  return $s
    .createSVGElement("g")
    .attr(
      "transform",
      "translate(" + x + " " + y + ")" + " scale(" + scale + ") "
    );
};

const params = [
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
];

export const createLEDSegmentDisplay = (segments) => {
  return (device) => {
    const onColor = device.deviceDef.color || defaultLEDColor;
    const bgColor = device.deviceDef.bgColor || defaultLEDBgColor;
    const offColor = multiplyColor(onColor, bgColor, 0.25);
    const allSegments = segments.allSegments + ".";

    for (let i = 0; i < allSegments.length; i += 1) {
      device.addInput();
    }
    device.halfPitch = true;

    const super_getSize = device.getSize;
    device.getSize = () => {
      const size = super_getSize();
      return { width: $s.unit * 4, height: size.height };
    };

    const super_createUI = device.createUI;
    device.createUI = () => {
      super_createUI();

      let $seg = segmentsUI(device, segments);
      device.$ui.append($seg);

      const update = () => {
        let pattern = "";
        for (let i = 0; i < allSegments.length; i++) {
          if (valueToBool(device.getInputs()[i].getValue())) {
            pattern += allSegments.charAt(i);
          }
        }
        $seg.children().remove();
        drawSegmentsPattern(
          $s.graphics($seg),
          segments,
          pattern,
          onColor,
          offColor,
          bgColor
        );
      };

      device.$ui.on("inputValueChange", update);
      update();

      device.doc = createDoc(device, params);
    };
  };
};
