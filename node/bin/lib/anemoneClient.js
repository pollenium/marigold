"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var pollenium_anemone_1 = require("pollenium-anemone");
exports.anemoneClient = new pollenium_anemone_1.Client(__assign(__assign({}, pollenium_anemone_1.clientDefaults), { signalingServerUrls: [
        'wss://begonia-us-1.herokuapp.com',
        'wss://begonia-us-1.herokuapp.com'
    ], sdpTimeout: 20, connectionTimeout: 20 }));
