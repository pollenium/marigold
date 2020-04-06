"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var SignedOrderTracker = /** @class */ (function () {
    function SignedOrderTracker(struct) {
        this.filled = new pollenium_buttercup_1.Uint256(0);
        this.executionRequestIndex = null;
        this.signedOrder = struct.signedOrder;
    }
    SignedOrderTracker.prototype.getFilled = function () {
        return this.filled;
    };
    SignedOrderTracker.prototype.incrementFilled = function (amount) {
        this.filled = this.filled.opAdd(amount);
        if (this.filled.compGt(this.signedOrder.tokenLimit)) {
            throw new Error('Overfilled');
        }
    };
    SignedOrderTracker.prototype.getExecutionRequestIndex = function () {
        return this.executionRequestIndex;
    };
    SignedOrderTracker.prototype.setExecutionRequestIndex = function (executionRequestIndex) {
        if (this.executionRequestIndex !== null) {
            throw new Error('executionRequestIndex already set');
        }
        this.executionRequestIndex = executionRequestIndex;
    };
    return SignedOrderTracker;
}());
exports.SignedOrderTracker = SignedOrderTracker;
