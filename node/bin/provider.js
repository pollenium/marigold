"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var infuraId = 'd2f248c0dbf64edc9a11447262bfe239';
exports.provider = new ethers_1.ethers.providers.InfuraProvider('homestead', infuraId);
