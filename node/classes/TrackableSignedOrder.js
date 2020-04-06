"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var SignedOrderTracker = /** @class */ (function () {
    function SignedOrderTracker(struct) {
        this.filled = new pollenium_buttercup_1.Uint256(0);
        this.signedOrder = struct.signedOrder;
    }
    SignedOrderTracker.prototype.fill = function (amount) {
        this.filled = this.filled.opAdd(amount);
        if (this.filled.compGt(this.signedOrder.tokenLimit)) {
            throw new Error('Overfilled');
        }
    };
    SignedOrderTracker.prototype.getRemaining = function () {
        return this.signedOrder.tokenLimit.opSub(this.filled);
    };
    return SignedOrderTracker;
}());
exports.SignedOrderTracker = SignedOrderTracker;
