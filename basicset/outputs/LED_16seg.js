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

import { createLEDSegmentDisplay, drawSegment } from "./helpers/LED";

/**
 *  a b
 * hijkc
 *  p l
 * gonmd
 *  fe
 */
const segmentData = {
  a: [255, 184, 356, 184, 407, 142, 373, 102, 187, 102],
  b: [418, 144, 451, 184, 552, 184, 651, 102, 468, 102],
  c: [557, 190, 507, 455, 540, 495, 590, 454, 656, 108],
  d: [487, 550, 438, 816, 506, 898, 573, 547, 539, 507],
  e: [281, 863, 315, 903, 500, 903, 432, 821, 331, 821],
  f: [35, 903, 220, 903, 270, 861, 236, 821, 135, 821],
  g: [97, 548, 30, 897, 129, 815, 180, 547, 147, 507],
  h: [114, 455, 148, 495, 198, 454, 248, 189, 181, 107],
  i: [233, 315, 280, 452, 341, 493, 326, 331, 255, 200],
  j: [361, 190, 334, 331, 349, 485, 422, 312, 445, 189, 412, 149],
  k: [430, 316, 354, 492, 432, 452, 522, 334, 547, 200],
  l: [354, 502, 408, 542, 484, 542, 534, 500, 501, 460, 434, 460],
  m: [361, 674, 432, 805, 454, 691, 405, 550, 351, 509],
  n: [265, 693, 242, 816, 276, 856, 326, 815, 353, 676, 343, 518],
  o: [255, 546, 165, 671, 139, 805, 258, 689, 338, 510],
  p: [153, 502, 187, 542, 254, 542, 338, 500, 278, 460, 203, 460],
};

export const _16segments = {
  width: 690,
  height: 1000,
  allSegments: "abcdefghijklmnop",
  drawSegment: drawSegment(segmentData),
  drawPoint: (g, color) => {
    if (!color) {
      return;
    }
    g.attr["fill"] = color;
    g.drawCircle(610, 900, 30);
  },
};

export const LED_16seg = createLEDSegmentDisplay(_16segments);
