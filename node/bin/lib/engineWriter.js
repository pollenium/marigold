"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var provider_1 = require("./provider");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var ethers_1 = require("ethers");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ilex_1 = require("pollenium-ilex");
dotenv_safe_1["default"].config();
var executorHotPrivateKey = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(process.env.EXECUTOR_HOT_PRIVATE_KEY_HEX));
var executorHotWallet = new ethers_1.ethers.Wallet(executorHotPrivateKey.uu.toHex(), provider_1.provider);
console.log('executorHot', new pollenium_ilex_1.Keypair(executorHotPrivateKey).getAddress().uu.toHex());
exports.engineWriter = new pollenium_alchemilla_1.EngineWriter({
    signer: executorHotWallet,
    address: pollenium_xanthoceras_1.xanthoceras.get('engine')
});
