"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var InvalidQuotTokenError = /** @class */ (function (_super) {
    __extends(InvalidQuotTokenError, _super);
    function InvalidQuotTokenError() {
        var _this = _super.call(this, 'Invalid quot token') || this;
        Object.setPrototypeOf(_this, InvalidQuotTokenError.prototype);
        return _this;
    }
    return InvalidQuotTokenError;
}(Error));
exports.InvalidQuotTokenError = InvalidQuotTokenError;
var InvalidVariTokenError = /** @class */ (function (_super) {
    __extends(InvalidVariTokenError, _super);
    function InvalidVariTokenError() {
        var _this = _super.call(this, 'Invalid vari token') || this;
        Object.setPrototypeOf(_this, InvalidVariTokenError.prototype);
        return _this;
    }
    return InvalidVariTokenError;
}(Error));
exports.InvalidVariTokenError = InvalidVariTokenError;
var SignedOrdersList = /** @class */ (function () {
    function SignedOrdersList(struct) {
        this.signedOrders = [];
        this.quotToken = new pollenium_buttercup_1.Address(struct.quotToken);
        this.variToken = new pollenium_buttercup_1.Address(struct.variToken);
    }
    SignedOrdersList.prototype.handleSignedOrder = function (signedOrder) {
        if (!signedOrder.quotToken.uu.getIsEqual(this.quotToken)) {
            throw new InvalidQuotTokenError;
        }
        if (!signedOrder.variToken.uu.getIsEqual(this.variToken)) {
            throw new InvalidVariTokenError;
        }
        this.signedOrders.push(signedOrder);
    };
    SignedOrdersList.prototype.removeExpirationLte = function (expirationCutoff) {
        this.signedOrders = this.signedOrders.filter(function (signedOrder) {
            return signedOrder.expiration.compGt(expirationCutoff);
        });
    };
    SignedOrdersList.prototype.removeFilled = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.fetchUnfilled(stateFetcher)];
                    case 1:
                        _a.signedOrders = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignedOrdersList.prototype.fetchUnfilled = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var signedOrders;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.signedOrders.map(function (signedOrder) { return __awaiter(_this, void 0, void 0, function () {
                            var fill;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, stateFetcher.fetchFill(signedOrder.getSignatureHash())];
                                    case 1:
                                        fill = _a.sent();
                                        if (fill.compEq(signedOrder.tokenLimit)) {
                                            return [2 /*return*/, signedOrder];
                                        }
                                        else {
                                            return [2 /*return*/, null];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        signedOrders = _a.sent();
                        return [2 /*return*/, signedOrders.filter(function (signedOrder) {
                                return signedOrder !== null;
                            })];
                }
            });
        });
    };
    SignedOrdersList.prototype.getSignedOrderPairs = function () {
        var signedBuyyOrders = this.getSignedOrdersByDirection(pollenium_alchemilla_1.OrderDirection.BUYY);
        var signedSellOrders = this.getSignedOrdersByDirection(pollenium_alchemilla_1.OrderDirection.SELL);
        var signedOrderPairs = [];
        signedBuyyOrders.forEach(function (signedBuyyOrder) {
            signedSellOrders.forEach(function (signedSellOrder) {
                if (signedBuyyOrder.getPrice().lt(signedSellOrder.getPrice())) {
                    return;
                }
                signedOrderPairs.push(new pollenium_alchemilla_1.SignedOrderPair({ signedBuyyOrder: signedBuyyOrder, signedSellOrder: signedSellOrder }));
            });
        });
        return signedOrderPairs;
    };
    SignedOrdersList.prototype.getSignedOrdersByDirection = function (orderDirection) {
        return this.signedOrders.filter(function (signedOrder) {
            return signedOrder.direction === orderDirection;
        });
    };
    SignedOrdersList.prototype.fetchProposals = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var signedOrderPairs, proposals;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signedOrderPairs = this.getSignedOrderPairs();
                        return [4 /*yield*/, Promise.all(signedOrderPairs.map(function (signedOrderPair) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {
                                                signedOrderPair: signedOrderPair
                                            };
                                            return [4 /*yield*/, signedOrderPair.calcSolution(stateFetcher)];
                                        case 1: return [2 /*return*/, (_a.solution = _b.sent(),
                                                _a)];
                                    }
                                });
                            }); }))];
                    case 1:
                        proposals = _a.sent();
                        return [2 /*return*/, proposals.filter(function (proposal) {
                                if (proposal.solution.quotTokenTrans.compEq(0)) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            })];
                }
            });
        });
    };
    SignedOrdersList.prototype.fetchBestProposal = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var proposals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchProposals(stateFetcher)];
                    case 1:
                        proposals = _a.sent();
                        if (proposals.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, proposals.sort(function (proposalA, proposalB) {
                                if (proposalA.solution.quotTokenArbit.compGte(proposalB.solution.quotTokenArbit)) {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            })[0]];
                }
            });
        });
    };
    SignedOrdersList.prototype.getSignedOrdersCount = function () {
        return this.signedOrders.length;
    };
    return SignedOrdersList;
}());
exports.SignedOrdersList = SignedOrdersList;
