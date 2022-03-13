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

const drawWithCircle = (drawBase, g, x, y, width, height) => {
  drawBase(g, x - 1, y, width - 2, height);
  g.drawCircle(x + width - 1, y + height / 2, 2);
};

export const drawBUF = (g, x, y, width, height) => {
  g.moveTo(x, y);
  g.lineTo(x + width, y + height / 2);
  g.lineTo(x, y + height);
  g.lineTo(x, y);
  g.closePath(true);
};

export const drawNOT = (g, x, y, width, height) => {
  drawWithCircle(drawBUF, g, x, y, width, height);
};

export const drawAND = (g, x, y, width, height) => {
  g.moveTo(x, y);
  g.curveTo(x + width, y, x + width, y + height / 2);
  g.curveTo(x + width, y + height, x, y + height);
  g.lineTo(x, y);
  g.closePath(true);
};

export const drawNAND = (g, x, y, width, height) => {
  drawWithCircle(drawAND, g, x, y, width, height);
};

export const drawOR = (g, x, y, width, height) => {
  const depth = width * 0.2;
  g.moveTo(x, y);
  g.curveTo(x + width - depth, y, x + width, y + height / 2);
  g.curveTo(x + width - depth, y + height, x, y + height);
  g.curveTo(x + depth, y + height, x + depth, y + height / 2);
  g.curveTo(x + depth, y, x, y);
  g.closePath(true);
};

export const drawNOR = (g, x, y, width, height) => {
  drawWithCircle(drawOR, g, x, y, width, height);
};

export const drawXOR = (g, x, y, width, height) => {
  drawOR(g, x + 3, y, width - 3, height);
  const depth = (width - 3) * 0.2;
  g.moveTo(x, y + height);
  g.curveTo(x + depth, y + height, x + depth, y + height / 2);
  g.curveTo(x + depth, y, x, y);
  g.closePath();
};

export const drawXNOR = (g, x, y, width, height) => {
  drawWithCircle(drawXOR, g, x, y, width, height);
};
