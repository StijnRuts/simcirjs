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

import { createLEDSegFactory, drawSegment } from "./helpers/LED";

const segmentData = {
  a: [575, 138, 494, 211, 249, 211, 194, 137, 213, 120, 559, 120],
  b: [595, 160, 544, 452, 493, 500, 459, 456, 500, 220, 582, 146],
  c: [525, 560, 476, 842, 465, 852, 401, 792, 441, 562, 491, 516],
  d: [457, 860, 421, 892, 94, 892, 69, 864, 144, 801, 394, 801],
  e: [181, 560, 141, 789, 61, 856, 48, 841, 96, 566, 148, 516],
  f: [241, 218, 200, 453, 150, 500, 115, 454, 166, 162, 185, 145],
  g: [485, 507, 433, 555, 190, 555, 156, 509, 204, 464, 451, 464],
};

export const _7Seg = {
  width: 636,
  height: 1000,
  allSegments: "abcdefg",
  drawSegment: drawSegment(segmentData),
  drawPoint: function (g, color) {
    if (!color) {
      return;
    }
    g.attr["fill"] = color;
    g.drawCircle(542, 840, 46);
  },
};

export const LED_7seg = createLEDSegFactory(_7Seg);
