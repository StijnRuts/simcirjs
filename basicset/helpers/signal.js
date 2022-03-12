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

export const isHot = function (v) {
  return v != null;
};

export const intValue = function (v) {
  return isHot(v) ? 1 : 0;
};
