"use strict";
exports.__esModule = true;
var pollenium_ilex_1 = require("pollenium-ilex");
exports.admin = pollenium_ilex_1.Keypair.generate();
exports.executorHot = pollenium_ilex_1.Keypair.generate();
exports.executorCold = pollenium_ilex_1.Keypair.generate();
exports.tokenDeployer = pollenium_ilex_1.Keypair.generate();
exports.alice = pollenium_ilex_1.Keypair.generate();
exports.bob = pollenium_ilex_1.Keypair.generate();
exports.charlie = pollenium_ilex_1.Keypair.generate();
exports.allKeypairs = [
    exports.tokenDeployer,
    exports.admin,
    exports.executorHot,
    exports.executorCold,
    exports.alice,
    exports.bob
];
