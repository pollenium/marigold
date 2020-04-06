"use strict";
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
function genSignedOrder(keypair, orderStruct) {
    var order = new pollenium_alchemilla_1.Order(orderStruct);
    return new pollenium_alchemilla_1.SignedOrder({
        order: order,
        signature: keypair.getSignature(order.getSugmaHash())
    });
}
exports.genSignedOrder = genSignedOrder;
