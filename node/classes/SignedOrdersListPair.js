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
var SignedOrdersList_1 = require("./SignedOrdersList");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var SignedOrdersListPair = /** @class */ (function () {
    function SignedOrdersListPair(struct) {
        this.buyy = new SignedOrdersList_1.SignedOrdersList(pollenium_alchemilla_1.ORDER_TYPE.BUYY);
        this.sell = new SignedOrdersList_1.SignedOrdersList(pollenium_alchemilla_1.ORDER_TYPE.SELL);
        this.isExecutionRequestUpdated = false;
        this.balancesDb = struct.balancesDb;
    }
    SignedOrdersListPair.prototype.handleSignedOrder = function (signedOrder) {
        if (signedOrder.type === pollenium_alchemilla_1.ORDER_TYPE.BUYY) {
            this.buyy.add(signedOrder);
        }
        else {
            this.sell.add(signedOrder);
        }
    };
    SignedOrdersListPair.prototype.updateExecutionRequest = function (executionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var signedBuyyOrderTrackers, signedSellOrderTrackers, i, signedBuyyOrderTracker, j, signedSellOrderTracker, signedBuyyOrder, signedSellOrder, orderPair, buyyOrderTokenFilled, sellOrderTokenFilled, buyyOrderTokenBalance, sellOrderTokenBalance, solution, buyyAmount, sellAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isExecutionRequestUpdated) {
                            throw new Error('Duplicate ExecutionRequest Update');
                        }
                        this.isExecutionRequestUpdated = true;
                        signedBuyyOrderTrackers = this.buyy.signedOrderTrackers;
                        signedSellOrderTrackers = this.sell.signedOrderTrackers;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < signedBuyyOrderTrackers.length)) return [3 /*break*/, 9];
                        signedBuyyOrderTracker = signedBuyyOrderTrackers[i];
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < signedSellOrderTrackers.length)) return [3 /*break*/, 8];
                        signedSellOrderTracker = signedSellOrderTrackers[j];
                        signedBuyyOrder = signedBuyyOrderTracker.signedOrder;
                        signedSellOrder = signedSellOrderTracker.signedOrder;
                        if (signedBuyyOrder.getPrice().lt(signedSellOrder.getPrice())) {
                            return [2 /*return*/];
                        }
                        orderPair = new pollenium_alchemilla_1.OrderPair({
                            buyyOrder: signedBuyyOrder,
                            sellOrder: signedSellOrder
                        });
                        buyyOrderTokenFilled = signedBuyyOrderTracker.getFilled();
                        sellOrderTokenFilled = signedSellOrderTracker.getFilled();
                        return [4 /*yield*/, this.balancesDb.fetch({
                                trader: signedBuyyOrder.getTrader(),
                                token: signedBuyyOrder.getLimitingToken()
                            })];
                    case 3:
                        buyyOrderTokenBalance = _a.sent();
                        return [4 /*yield*/, this.balancesDb.fetch({
                                trader: signedSellOrder.getTrader(),
                                token: signedSellOrder.getLimitingToken()
                            })];
                    case 4:
                        sellOrderTokenBalance = _a.sent();
                        console.dir({
                            buyyOrderTokenFilled: buyyOrderTokenFilled.toNumber(),
                            sellOrderTokenFilled: sellOrderTokenFilled.toNumber(),
                            buyyOrderTokenBalance: buyyOrderTokenBalance.toNumber(),
                            sellOrderTokenBalance: sellOrderTokenBalance.toNumber()
                        });
                        solution = orderPair.getSolution({
                            buyyOrderTokenFilled: buyyOrderTokenFilled,
                            sellOrderTokenFilled: sellOrderTokenFilled,
                            buyyOrderTokenBalance: buyyOrderTokenBalance,
                            sellOrderTokenBalance: sellOrderTokenBalance
                        });
                        buyyAmount = solution.quotTokenTrans.opAdd(solution.quotTokenArbit);
                        sellAmount = solution.variTokenTrans;
                        console.dir({
                            buyyAmount: buyyAmount.toNumber(),
                            sellAmount: sellAmount.toNumber()
                        });
                        if (buyyAmount.compEq(0) || sellAmount.compEq(0)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.balancesDb.decrement({
                                trader: signedBuyyOrder.getTrader(),
                                token: signedBuyyOrder.getLimitingToken(),
                                amount: buyyAmount
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.balancesDb.decrement({
                                trader: signedSellOrder.getTrader(),
                                token: signedSellOrder.getLimitingToken(),
                                amount: sellAmount
                            })];
                    case 6:
                        _a.sent();
                        signedBuyyOrderTracker.incrementFilled(buyyAmount);
                        signedSellOrderTracker.incrementFilled(sellAmount);
                        if (signedBuyyOrderTracker.getExecutionRequestIndex() === null) {
                            signedBuyyOrderTracker.setExecutionRequestIndex(executionRequest.signedBuyyOrders.length);
                            executionRequest.signedBuyyOrders.push(signedBuyyOrder);
                        }
                        if (signedSellOrderTracker.getExecutionRequestIndex() === null) {
                            signedSellOrderTracker.setExecutionRequestIndex(executionRequest.signedSellOrders.length);
                            executionRequest.signedSellOrders.push(signedSellOrder);
                        }
                        executionRequest.exchanges.push(__assign({ signedBuyyOrderIndex: signedBuyyOrderTracker.getExecutionRequestIndex(), signedSellOrderIndex: signedSellOrderTracker.getExecutionRequestIndex() }, solution));
                        _a.label = 7;
                    case 7:
                        j++;
                        return [3 /*break*/, 2];
                    case 8:
                        i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return SignedOrdersListPair;
}());
exports.SignedOrdersListPair = SignedOrdersListPair;
