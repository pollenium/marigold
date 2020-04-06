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
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var Uint256Tracker_1 = require("./Uint256Tracker");
var MetaStateTracker = /** @class */ (function (_super) {
    __extends(MetaStateTracker, _super);
    function MetaStateTracker(stateFetcher) {
        var _this = _super.call(this) || this;
        _this.stateFetcher = stateFetcher;
        _this.balanceTrackersByHolderHexTokenHex = {};
        _this.fillTrackersBySignatureHashHex = {};
        return _this;
    }
    MetaStateTracker.prototype.getBalanceTracker = function (struct) {
        var holderHex = new pollenium_buttercup_1.Address(struct.holder).uu.toHex();
        var tokenHex = new pollenium_buttercup_1.Address(struct.token).uu.toHex();
        if (this.balanceTrackersByHolderHexTokenHex[holderHex] === undefined) {
            this.balanceTrackersByHolderHexTokenHex[holderHex] = {};
        }
        if (this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex] === undefined) {
            this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex] = new Uint256Tracker_1.Uint256Tracker(this.stateFetcher.fetchBalance(struct));
        }
        return this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex];
    };
    MetaStateTracker.prototype.getFillTracker = function (signatureHash) {
        var signatureHashHex = pollenium_uvaursi_1.Uu.wrap(signatureHash).toHex();
        if (this.fillTrackersBySignatureHashHex[signatureHashHex] === undefined) {
            this.fillTrackersBySignatureHashHex[signatureHashHex] = new Uint256Tracker_1.Uint256Tracker(this.stateFetcher.fetchFill(signatureHash));
        }
        return this.fillTrackersBySignatureHashHex[signatureHashHex];
    };
    MetaStateTracker.prototype.fetchBalance = function (struct) {
        return this.getBalanceTracker(struct).fetchCumulative();
    };
    MetaStateTracker.prototype.fetchFill = function (signatureHash) {
        return this.getFillTracker(signatureHash).fetchCumulative();
    };
    MetaStateTracker.prototype.calcSolution = function (signedOrderPair) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, signedOrderPair.calcSolution(this)];
            });
        });
    };
    MetaStateTracker.prototype.incorporateProposal = function (proposal) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, signedBuyyOrder, signedSellOrder, quotToken, variToken, _b, quotTokenTrans, variTokenTrans, quotTokenArbit, quotTokenTotal, signedBuyyOrderFillTracker, signedSellOrderFillTracker, buyyerQuotBalanceTracker, buyyerVariBalanceTracker, sellerQuotBalanceTracker, sellerVariBalanceTracker;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = proposal.signedOrderPair, signedBuyyOrder = _a.signedBuyyOrder, signedSellOrder = _a.signedSellOrder, quotToken = _a.quotToken, variToken = _a.variToken;
                        _b = proposal.solution, quotTokenTrans = _b.quotTokenTrans, variTokenTrans = _b.variTokenTrans, quotTokenArbit = _b.quotTokenArbit;
                        quotTokenTotal = quotTokenTrans.opAdd(quotTokenArbit);
                        signedBuyyOrderFillTracker = this.getFillTracker(signedBuyyOrder.getSignatureHash());
                        signedSellOrderFillTracker = this.getFillTracker(signedSellOrder.getSignatureHash());
                        buyyerQuotBalanceTracker = this.getBalanceTracker({
                            holder: signedBuyyOrder.getTrader(),
                            token: quotToken
                        });
                        buyyerVariBalanceTracker = this.getBalanceTracker({
                            holder: signedBuyyOrder.getTrader(),
                            token: variToken
                        });
                        sellerQuotBalanceTracker = this.getBalanceTracker({
                            holder: signedSellOrder.getTrader(),
                            token: quotToken
                        });
                        sellerVariBalanceTracker = this.getBalanceTracker({
                            holder: signedSellOrder.getTrader(),
                            token: variToken
                        });
                        return [4 /*yield*/, signedBuyyOrderFillTracker.increment(quotTokenTotal)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, signedSellOrderFillTracker.increment(variTokenTrans)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, buyyerVariBalanceTracker.increment(variTokenTrans)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, buyyerQuotBalanceTracker.decrement(quotTokenTotal)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, sellerQuotBalanceTracker.increment(quotTokenTrans)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, sellerVariBalanceTracker.decrement(variTokenTrans)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MetaStateTracker;
}(pollenium_alchemilla_1.StateFetcher));
exports.MetaStateTracker = MetaStateTracker;
