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
var SignedOrdersList_1 = require("./SignedOrdersList");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_ilex_1 = require("pollenium-ilex");
var MetaStateTracker_1 = require("./MetaStateTracker");
var PseudoStateFetcher = /** @class */ (function (_super) {
    __extends(PseudoStateFetcher, _super);
    function PseudoStateFetcher(struct) {
        var _this = _super.call(this) || this;
        _this.fill = new pollenium_buttercup_1.Uint256(struct.fill);
        _this.balance = new pollenium_buttercup_1.Uint256(struct.balance);
        return _this;
    }
    PseudoStateFetcher.prototype.fetchFill = function () {
        return Promise.resolve(this.fill);
    };
    PseudoStateFetcher.prototype.fetchBalance = function () {
        return Promise.resolve(this.balance);
    };
    return PseudoStateFetcher;
}(pollenium_alchemilla_1.StateFetcher));
describe('SignedOrdersList', function () {
    var quotToken = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.genRandom(20));
    var variToken = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.genRandom(20));
    var randToken = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.genRandom(20));
    var salt = pollenium_uvaursi_1.Uu.genRandom(32);
    var aliceKeypair = pollenium_ilex_1.Keypair.generate();
    var bobKeypair = pollenium_ilex_1.Keypair.generate();
    test('should throw InvalidQuotTokenError', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signedOrdersList, signedOrder;
        return __generator(this, function (_a) {
            expect.assertions(1);
            signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
            signedOrder = pollenium_alchemilla_1.SignedOrder.gen({
                order: {
                    direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                    quotToken: randToken,
                    variToken: variToken,
                    expiration: 0,
                    priceNumer: 1,
                    priceDenom: 1,
                    tokenLimit: 1,
                    salt: salt
                },
                privateKey: aliceKeypair.privateKey
            });
            try {
                signedOrdersList.handleSignedOrder(signedOrder);
            }
            catch (error) {
                expect(error).toBeInstanceOf(SignedOrdersList_1.InvalidQuotTokenError);
            }
            return [2 /*return*/];
        });
    }); });
    test('should throw InvalidVariTokenError', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signedOrdersList, signedOrder;
        return __generator(this, function (_a) {
            expect.assertions(1);
            signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
            signedOrder = pollenium_alchemilla_1.SignedOrder.gen({
                order: {
                    direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                    quotToken: quotToken,
                    variToken: randToken,
                    expiration: 0,
                    priceNumer: 1,
                    priceDenom: 1,
                    tokenLimit: 1,
                    salt: salt
                },
                privateKey: aliceKeypair.privateKey
            });
            try {
                signedOrdersList.handleSignedOrder(signedOrder);
            }
            catch (error) {
                expect(error).toBeInstanceOf(SignedOrdersList_1.InvalidVariTokenError);
            }
            return [2 /*return*/];
        });
    }); });
    test('should handle/remove expired order', function () {
        var signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
        var signedOrder0 = pollenium_alchemilla_1.SignedOrder.gen({
            order: {
                direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                quotToken: quotToken,
                variToken: variToken,
                expiration: 0,
                priceNumer: 1,
                priceDenom: 1,
                tokenLimit: 1,
                salt: salt
            },
            privateKey: aliceKeypair.privateKey
        });
        signedOrdersList.handleSignedOrder(signedOrder0);
        expect(signedOrdersList.getSignedOrdersCount()).toBe(1);
        var signedOrder1 = pollenium_alchemilla_1.SignedOrder.gen({
            order: {
                direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                quotToken: quotToken,
                variToken: variToken,
                expiration: 1,
                priceNumer: 1,
                priceDenom: 1,
                tokenLimit: 1,
                salt: salt
            },
            privateKey: aliceKeypair.privateKey
        });
        signedOrdersList.handleSignedOrder(signedOrder1);
        expect(signedOrdersList.getSignedOrdersCount()).toBe(2);
        signedOrdersList.removeExpirationLte(0);
        expect(signedOrdersList.getSignedOrdersCount()).toBe(1);
        signedOrdersList.removeExpirationLte(1);
        expect(signedOrdersList.getSignedOrdersCount()).toBe(0);
    });
    test('should create/incorporateProposal a proposal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signedOrdersList, metaStateTracker, signedBuyyOrder, signedSellOrder, proposals, proposal, buyyerQuotBalance, buyyerVariBalance, sellerQuotBalance, sellerVariBalance, signedBuyyOrderFill, signedSellOrderFill;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
                    metaStateTracker = new MetaStateTracker_1.MetaStateTracker(new PseudoStateFetcher({
                        fill: 0,
                        balance: 100
                    }));
                    signedBuyyOrder = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 1,
                            priceDenom: 1,
                            tokenLimit: 1,
                            salt: salt
                        },
                        privateKey: aliceKeypair.privateKey
                    });
                    signedSellOrder = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.SELL,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 1,
                            priceDenom: 1,
                            tokenLimit: 1,
                            salt: salt
                        },
                        privateKey: bobKeypair.privateKey
                    });
                    signedOrdersList.handleSignedOrder(signedBuyyOrder);
                    signedOrdersList.handleSignedOrder(signedSellOrder);
                    return [4 /*yield*/, signedOrdersList.fetchProposals(metaStateTracker)];
                case 1:
                    proposals = _a.sent();
                    expect(proposals.length).toBe(1);
                    proposal = proposals[0];
                    expect(proposal.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder);
                    expect(proposal.signedOrderPair.signedSellOrder).toBe(signedSellOrder);
                    expect(proposal.solution.quotTokenTrans.toNumber()).toBe(1);
                    expect(proposal.solution.variTokenTrans.toNumber()).toBe(1);
                    expect(proposal.solution.quotTokenArbit.toNumber()).toBe(0);
                    return [4 /*yield*/, metaStateTracker.incorporateProposal(proposal)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedBuyyOrder.getTrader(),
                            token: quotToken
                        })];
                case 3:
                    buyyerQuotBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedBuyyOrder.getTrader(),
                            token: variToken
                        })];
                case 4:
                    buyyerVariBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedSellOrder.getTrader(),
                            token: quotToken
                        })];
                case 5:
                    sellerQuotBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedSellOrder.getTrader(),
                            token: variToken
                        })];
                case 6:
                    sellerVariBalance = _a.sent();
                    expect(buyyerQuotBalance.toNumber()).toBe(99);
                    expect(buyyerVariBalance.toNumber()).toBe(101);
                    expect(sellerQuotBalance.toNumber()).toBe(101);
                    expect(sellerVariBalance.toNumber()).toBe(99);
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedBuyyOrder.getSignatureHash())];
                case 7:
                    signedBuyyOrderFill = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedSellOrder.getSignatureHash())];
                case 8:
                    signedSellOrderFill = _a.sent();
                    expect(signedBuyyOrderFill.toNumber()).toBe(1);
                    expect(signedSellOrderFill.toNumber()).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should create/incorporateProposal a proposal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signedOrdersList, metaStateTracker, signedBuyyOrder, signedSellOrder, proposals, proposal, buyyerQuotBalance, buyyerVariBalance, sellerQuotBalance, sellerVariBalance, signedBuyyOrderFill, signedSellOrderFill;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
                    metaStateTracker = new MetaStateTracker_1.MetaStateTracker(new PseudoStateFetcher({
                        fill: 75,
                        balance: 50
                    }));
                    signedBuyyOrder = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 2,
                            priceDenom: 1,
                            tokenLimit: 100,
                            salt: salt
                        },
                        privateKey: aliceKeypair.privateKey
                    });
                    signedSellOrder = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.SELL,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 2,
                            priceDenom: 1,
                            tokenLimit: 100,
                            salt: salt
                        },
                        privateKey: bobKeypair.privateKey
                    });
                    signedOrdersList.handleSignedOrder(signedBuyyOrder);
                    signedOrdersList.handleSignedOrder(signedSellOrder);
                    return [4 /*yield*/, signedOrdersList.fetchProposals(metaStateTracker)];
                case 1:
                    proposals = _a.sent();
                    expect(proposals.length).toBe(1);
                    proposal = proposals[0];
                    expect(proposal.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder);
                    expect(proposal.signedOrderPair.signedSellOrder).toBe(signedSellOrder);
                    expect(proposal.solution.quotTokenTrans.toNumber()).toBe(24);
                    expect(proposal.solution.variTokenTrans.toNumber()).toBe(12);
                    expect(proposal.solution.quotTokenArbit.toNumber()).toBe(0);
                    return [4 /*yield*/, metaStateTracker.incorporateProposal(proposal)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedBuyyOrder.getTrader(),
                            token: quotToken
                        })];
                case 3:
                    buyyerQuotBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedBuyyOrder.getTrader(),
                            token: variToken
                        })];
                case 4:
                    buyyerVariBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedSellOrder.getTrader(),
                            token: quotToken
                        })];
                case 5:
                    sellerQuotBalance = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchBalance({
                            holder: signedSellOrder.getTrader(),
                            token: variToken
                        })];
                case 6:
                    sellerVariBalance = _a.sent();
                    expect(buyyerQuotBalance.toNumber()).toBe(26);
                    expect(buyyerVariBalance.toNumber()).toBe(62);
                    expect(sellerQuotBalance.toNumber()).toBe(74);
                    expect(sellerVariBalance.toNumber()).toBe(38);
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedBuyyOrder.getSignatureHash())];
                case 7:
                    signedBuyyOrderFill = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedSellOrder.getSignatureHash())];
                case 8:
                    signedSellOrderFill = _a.sent();
                    expect(signedBuyyOrderFill.toNumber()).toBe(99);
                    expect(signedSellOrderFill.toNumber()).toBe(87);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should create/incorporateProposal a proposal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signedOrdersList, metaStateTracker, signedBuyyOrder1, signedBuyyOrder2, signedSellOrder1, signedSellOrder2, proposals0, proposal0, signedBuyyOrder2Fill, signedSellOrder2Fill, proposals1, proposal1, signedBuyyOrder1Fill, signedSellOrder1Fill, proposal2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signedOrdersList = new SignedOrdersList_1.SignedOrdersList({ quotToken: quotToken, variToken: variToken });
                    metaStateTracker = new MetaStateTracker_1.MetaStateTracker(new PseudoStateFetcher({
                        fill: 0,
                        balance: 100
                    }));
                    signedBuyyOrder1 = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 1,
                            priceDenom: 1,
                            tokenLimit: 2,
                            salt: salt
                        },
                        privateKey: aliceKeypair.privateKey
                    });
                    signedBuyyOrder2 = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 2,
                            priceDenom: 1,
                            tokenLimit: 2,
                            salt: salt
                        },
                        privateKey: aliceKeypair.privateKey
                    });
                    signedSellOrder1 = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.SELL,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 1,
                            priceDenom: 1,
                            tokenLimit: 2,
                            salt: salt
                        },
                        privateKey: bobKeypair.privateKey
                    });
                    signedSellOrder2 = pollenium_alchemilla_1.SignedOrder.gen({
                        order: {
                            direction: pollenium_alchemilla_1.OrderDirection.SELL,
                            quotToken: quotToken,
                            variToken: variToken,
                            expiration: 0,
                            priceNumer: 2,
                            priceDenom: 1,
                            tokenLimit: 2,
                            salt: salt
                        },
                        privateKey: bobKeypair.privateKey
                    });
                    signedOrdersList.handleSignedOrder(signedBuyyOrder1);
                    signedOrdersList.handleSignedOrder(signedBuyyOrder2);
                    signedOrdersList.handleSignedOrder(signedSellOrder1);
                    signedOrdersList.handleSignedOrder(signedSellOrder2);
                    return [4 /*yield*/, signedOrdersList.fetchProposals(metaStateTracker)];
                case 1:
                    proposals0 = _a.sent();
                    expect(proposals0.length).toBe(3);
                    return [4 /*yield*/, signedOrdersList.fetchBestProposal(metaStateTracker)];
                case 2:
                    proposal0 = _a.sent();
                    expect(proposal0.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder2);
                    expect(proposal0.signedOrderPair.signedSellOrder).toBe(signedSellOrder1);
                    expect(proposal0.solution.quotTokenArbit.toNumber()).toBe(1);
                    return [4 /*yield*/, metaStateTracker.incorporateProposal(proposal0)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedBuyyOrder2.getSignatureHash())];
                case 4:
                    signedBuyyOrder2Fill = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedSellOrder1.getSignatureHash())];
                case 5:
                    signedSellOrder2Fill = _a.sent();
                    expect(signedBuyyOrder2Fill.toNumber()).toBe(2);
                    expect(signedSellOrder2Fill.toNumber()).toBe(1);
                    return [4 /*yield*/, signedOrdersList.fetchProposals(metaStateTracker)];
                case 6:
                    proposals1 = _a.sent();
                    expect(proposals1.length).toBe(1);
                    return [4 /*yield*/, signedOrdersList.fetchBestProposal(metaStateTracker)];
                case 7:
                    proposal1 = _a.sent();
                    expect(proposal1.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder1);
                    expect(proposal1.signedOrderPair.signedSellOrder).toBe(signedSellOrder1);
                    return [4 /*yield*/, metaStateTracker.incorporateProposal(proposal1)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedBuyyOrder1.getSignatureHash())];
                case 9:
                    signedBuyyOrder1Fill = _a.sent();
                    return [4 /*yield*/, metaStateTracker.fetchFill(signedSellOrder1.getSignatureHash())];
                case 10:
                    signedSellOrder1Fill = _a.sent();
                    expect(signedBuyyOrder1Fill.toNumber()).toBe(1);
                    expect(signedSellOrder1Fill.toNumber()).toBe(2);
                    return [4 /*yield*/, signedOrdersList.fetchBestProposal(metaStateTracker)];
                case 11:
                    proposal2 = _a.sent();
                    expect(proposal2).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
