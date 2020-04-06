"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var SignedOrdersList = /** @class */ (function () {
    function SignedOrdersList(orderType) {
        this.orderType = orderType;
        this.signedOrders = [];
    }
    SignedOrdersList.prototype.push = function (signedOrder) {
        this.signedOrders.push(signedOrder);
        this.sort();
    };
    SignedOrdersList.prototype.sort = function () {
        var _this = this;
        this.signedOrders.sort(function (signedOrderA, signedOrderB) {
            var isAGtB = (signedOrderA.priceNumer.opMul(signedOrderB.priceDenom)).compGt(signedOrderA.priceDenom.opMul(signedOrderB.priceNumer));
            if (_this.orderType === pollenium_alchemilla_1.ORDER_TYPE.BUYY) {
                if (isAGtB) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                if (isAGtB) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        });
    };
    return SignedOrdersList;
}());
exports.SignedOrdersList = SignedOrdersList;
var SignedOrdersDb = /** @class */ (function () {
    function SignedOrdersDb() {
        this.signedOrdersByQuotTokenHexVariTokenHexOrderType = {};
    }
    return SignedOrdersDb;
}());
exports.SignedOrdersDb = SignedOrdersDb;
var SignedOrdersBatch = /** @class */ (function () {
    function SignedOrdersBatch(struct) {
        this.balancesByTokenHexTraderHex = {};
        this.isExecuted = false;
        this.engineReader = struct.engineReader;
        this.blockHash = new pollenium_buttercup_1.Bytes32(struct.blockHash);
        this.quotTokens = struct.quotTokens.map(function (quotTokenUish) {
            return new pollenium_buttercup_1.Address(quotTokenUish);
        });
    }
    SignedOrdersBatch.prototype.handleSignedOrder = function (signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var quotTokenIndex, quotTokenHex, variTokenHex, buyyAndSellSignedOrders, signedOrders;
            return __generator(this, function (_a) {
                if (!signedOrder.prevBlockHash.uu.getIsEqual(this.blockHash)) {
                    return [2 /*return*/];
                }
                quotTokenIndex = this.quotTokens.findIndex(function (quotToken) {
                    return quotToken.uu.getIsEqual(signedOrder.quotToken);
                });
                if (quotTokenIndex === -1) {
                    return [2 /*return*/];
                }
                this.maybeUpdateBalance({
                    token: signedOrder.getLimitingToken(),
                    trader: signedOrder.getTrader()
                });
                quotTokenHex = signedOrder.quotToken.uu.toHex();
                variTokenHex = signedOrder.variToken.uu.toHex();
                if (this.signedOrdersByQuotTokenHexVariTokenHex[quotTokenHex] === undefined) {
                    this.signedOrdersByQuotTokenHexVariTokenHex[quotTokenHex] = {};
                }
                if (this.signedOrdersByQuotTokenHexVariTokenHex[quotTokenHex][variTokenHex] === undefined) {
                    this.signedOrdersByQuotTokenHexVariTokenHex[quotTokenHex][variTokenHex] = { buyy: [], sell: [] };
                }
                buyyAndSellSignedOrders = this.signedOrdersByQuotTokenHexVariTokenHex[quotTokenHex][variTokenHex];
                signedOrders = signedOrder.type === pollenium_alchemilla_1.ORDER_TYPE.BUYY
                    ? buyyAndSellSignedOrders.buyy
                    : buyyAndSellSignedOrders.sell;
                signedOrders.push(signedOrder);
                if (signedOrder.type === pollenium_alchemilla_1.ORDER_TYPE.BUYY) {
                    signedOrders.sortAscending();
                }
                else {
                    signedOrders.sortDescending();
                }
                return [2 /*return*/];
            });
        });
    };
    SignedOrdersBatch.prototype.maybeUpdateBalance = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var token, trader, tokenHex, traderHex, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = struct.token, trader = struct.trader;
                        tokenHex = token.uu.toHex();
                        traderHex = trader.uu.toHex();
                        if (this.balancesByTokenHexTraderHex[tokenHex] === undefined) {
                            this.balancesByTokenHexTraderHex[tokenHex] = {};
                        }
                        else if (this.balancesByTokenHexTraderHex[tokenHex][traderHex] !== undefined) {
                            return [2 /*return*/];
                        }
                        _a = this.balancesByTokenHexTraderHex[tokenHex];
                        _b = traderHex;
                        return [4 /*yield*/, this.engineReader.fetchBalance({
                                token: token,
                                holder: trader
                            })];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignedOrdersBatch.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.isExecuted) {
                    throw new Error('Already executed');
                }
                this.isExecuted = true;
                return [2 /*return*/];
            });
        });
    };
    return SignedOrdersBatch;
}());
exports.SignedOrdersBatch = SignedOrdersBatch;
