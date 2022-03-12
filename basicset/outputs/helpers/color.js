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

const HEX = "0123456789abcdef";

const toIColor = function (sColor) {
  if (!sColor) {
    return 0;
  }

  sColor = sColor.toLowerCase();

  if (sColor.match(/^#[0-9a-f]{3}$/i)) {
    let iColor = 0;
    for (let i = 0; i < 6; i += 1) {
      iColor = (iColor << 4) | HEX.indexOf(sColor.charAt((i >> 1) + 1));
    }
    return iColor;
  }

  if (sColor.match(/^#[0-9a-f]{6}$/i)) {
    let iColor = 0;
    for (let i = 0; i < 6; i += 1) {
      iColor = (iColor << 4) | HEX.indexOf(sColor.charAt(i + 1));
    }
    return iColor;
  }

  return 0;
};

const toSColor = function (iColor) {
  let sColor = "#";
  for (let i = 0; i < 6; i += 1) {
    sColor += HEX.charAt((iColor >>> ((5 - i) * 4)) & 0x0f);
  }

  return sColor;
};

const toRGB = function (iColor) {
  return {
    r: (iColor >>> 16) & 0xff,
    g: (iColor >>> 8) & 0xff,
    b: iColor & 0xff,
  };
};

const _multiplyColor = function (iColor1, iColor2, ratio) {
  const c1 = toRGB(iColor1);
  const c2 = toRGB(iColor2);
  const mc = function (v1, v2, ratio) {
    return ~~Math.max(0, Math.min((v1 - v2) * ratio + v2, 255));
  };
  return (
    (mc(c1.r, c2.r, ratio) << 16) |
    (mc(c1.g, c2.g, ratio) << 8) |
    mc(c1.b, c2.b, ratio)
  );
};

export const multiplyColor = function (color1, color2, ratio) {
  return toSColor(_multiplyColor(toIColor(color1), toIColor(color2), ratio));
};
