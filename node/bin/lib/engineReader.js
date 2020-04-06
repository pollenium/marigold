"use strict";
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var provider_1 = require("./provider");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
exports.engineReader = new pollenium_alchemilla_1.EngineReader({
    provider: provider_1.provider,
    address: pollenium_xanthoceras_1.xanthoceras.get('engine')
});
