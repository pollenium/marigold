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
var pollenium_buttercup_1 = require("pollenium-buttercup");
var BalancesDb_1 = require("./BalancesDb");
var SignedOrdersDb_1 = require("./SignedOrdersDb");
var InvalidBlockNumberError = /** @class */ (function (_super) {
    __extends(InvalidBlockNumberError, _super);
    function InvalidBlockNumberError(expiration) {
        var _this = _super.call(this, "Invalid expiration: " + blockNumber.toNumberString(10)) || this;
        Object.setPrototypeOf(_this, InvalidBlockNumberError.prototype);
        return _this;
    }
    return InvalidBlockNumberError;
}(Error));
exports.InvalidBlockNumberError = InvalidBlockNumberError;
var InvalidSaltError = /** @class */ (function (_super) {
    __extends(InvalidSaltError, _super);
    function InvalidSaltError(orderSalt) {
        var _this = _super.call(this, "Invalid orderSalt: " + orderSalt.uu.toHex()) || this;
        Object.setPrototypeOf(_this, InvalidSaltError.prototype);
        return _this;
    }
    return InvalidSaltError;
}(Error));
exports.InvalidSaltError = InvalidSaltError;
var InvalidQuotTokenError = /** @class */ (function (_super) {
    __extends(InvalidQuotTokenError, _super);
    function InvalidQuotTokenError(quotToken) {
        var _this = _super.call(this, "Invalid quotToken: " + quotToken.uu.toHex()) || this;
        Object.setPrototypeOf(_this, InvalidQuotTokenError.prototype);
        return _this;
    }
    return InvalidQuotTokenError;
}(Error));
exports.InvalidQuotTokenError = InvalidQuotTokenError;
var Batch = /** @class */ (function () {
    function Batch(struct) {
        this.blockNumber = new pollenium_buttercup_1.Uint256(struct.blockNumber);
        this.quotTokens = struct.quotTokens.map(function (quotTokenUish) {
            return new pollenium_buttercup_1.Address(quotTokenUish);
        });
        this.orderSalt = new pollenium_buttercup_1.Bytes32(struct.orderSalt);
        this.fetchBalance = struct.fetchBalance;
        this.balancesDb = new BalancesDb_1.BalancesDb(__assign({}, struct));
        this.signedOrdersDb = new SignedOrdersDb_1.SignedOrdersDb(__assign({ balancesDb: this.balancesDb }, struct));
    }
    Batch.prototype.handleSignedOrder = function (signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var quotTokenIndex;
            return __generator(this, function (_a) {
                if (!signedOrder.blockNumber.uu.getIsEqual(this.blockNumber)) {
                    throw new InvalidBlockNumberError(signedOrder.blockNumber);
                }
                if (!signedOrder.salt.uu.getIsEqual(this.orderSalt)) {
                    throw new InvalidSaltError(signedOrder.salt);
                }
                quotTokenIndex = this.quotTokens.findIndex(function (quotToken) {
                    return quotToken.uu.getIsEqual(signedOrder.quotToken);
                });
                if (quotTokenIndex === -1) {
                    throw new InvalidQuotTokenError(signedOrder.quotToken);
                }
                this.balancesDb.maybeUpdate({
                    token: signedOrder.getLimitingToken(),
                    trader: signedOrder.getTrader()
                });
                this.signedOrdersDb.handleSignedOrder(signedOrder);
                return [2 /*return*/];
            });
        });
    };
    Batch.prototype.fetchExecutionRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.executionRequestPromise) {
                    return [2 /*return*/, this.executionRequestPromise];
                }
                this.executionRequestPromise = this.signedOrdersDb.fetchExecutionRequest().then(function (executionRequest) {
                    return {
                        expiration: new pollenium_buttercup_1.Uint256(executionRequest.blockNumber),
                        signedBuyyOrders: executionRequest.signedBuyyOrders,
                        signedSellOrders: executionRequest.signedSellOrders,
                        exchanges: executionRequest.exchanges.map(function (exchange) {
                            return {
                                signedBuyyOrderIndex: new pollenium_buttercup_1.Uint8(exchange.signedBuyyOrderIndex).toNumber(),
                                signedSellOrderIndex: new pollenium_buttercup_1.Uint8(exchange.signedSellOrderIndex).toNumber(),
                                quotTokenTrans: new pollenium_buttercup_1.Uint256(exchange.quotTokenTrans),
                                variTokenTrans: new pollenium_buttercup_1.Uint256(exchange.variTokenTrans),
                                quotTokenArbit: new pollenium_buttercup_1.Uint256(exchange.quotTokenArbit)
                            };
                        })
                    };
                }).then(function (executionRequest) {
                    // re-order in terms of priority
                    var signedBuyyOrders = executionRequest.signedBuyyOrders.slice().sort(function (signedOrderA, signedOrderB) {
                        if (signedOrderA.getPriority().compGte(signedOrderB.getPriority())) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    var signedSellOrders = executionRequest.signedSellOrders.slice().sort(function (signedOrderA, signedOrderB) {
                        if (signedOrderA.getPriority().compGte(signedOrderB.getPriority())) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    var exchanges = executionRequest.exchanges.map(function (exchange) {
                        var signedBuyyOrder = executionRequest.signedBuyyOrders[exchange.signedBuyyOrderIndex];
                        var signedSellOrder = executionRequest.signedSellOrders[exchange.signedSellOrderIndex];
                        return __assign(__assign({}, exchange), { signedBuyyOrderIndex: signedBuyyOrders.indexOf(signedBuyyOrder), signedSellOrderIndex: signedSellOrders.indexOf(signedSellOrder) });
                    });
                    return {
                        expiration: executionRequest.blockNumber,
                        signedBuyyOrders: signedBuyyOrders,
                        signedSellOrders: signedSellOrders,
                        exchanges: exchanges
                    };
                });
                return [2 /*return*/, this.executionRequestPromise];
            });
        });
    };
    return Batch;
}());
exports.Batch = Batch;
