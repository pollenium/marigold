"use strict";
exports.__esModule = true;
var pollenium_toadflax_1 = require("pollenium-toadflax");
var gaillardia_1 = require("./gaillardia");
function genTokenWriter(token, keypair) {
    return new pollenium_toadflax_1.TokenWriter({
        address: token,
        signer: gaillardia_1.gaillardia.genWallet(keypair.privateKey)
    });
}
exports.genTokenWriter = genTokenWriter;
