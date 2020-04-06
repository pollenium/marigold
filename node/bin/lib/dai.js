"use strict";
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var daiHex = '6B175474E89094C44Da98b954EedeAC495271d0F';
exports.dai = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(daiHex));
