"use strict";
exports.__esModule = true;
var BalancesTracker = /** @class */ (function () {
    function BalancesTracker(struct) {
        this.balancePromisesByTraderHex = {};
    }
    BalancesTracker.prototype.fetchBalance = function (trader) {
        var traderHex = new Address(trader).uu.toHex();
        if (this.balancesByTraderHex[traderHex] !== undefined) {
            return this.balancesByTraderHex[traderHex];
        }
        this.balancesByTraderHex[traderHex] = this.engineReader.fetchFill(trader);
        return this.balancesByTraderHex[traderHex];
    };
    return BalancesTracker;
}());
exports.BalancesTracker = BalancesTracker;
