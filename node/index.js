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
var pollenium_bellflower_1 = require("pollenium-bellflower");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var ethers_1 = require("ethers");
var SignedOrdersList_1 = require("./classes/SignedOrdersList");
var MetaStateTracker_1 = require("./classes/MetaStateTracker");
function calcPairId(pair) {
    return pollenium_uvaursi_1.Uu.wrap(pair.quotToken).genXor(pair.variToken);
}
var Marigold = /** @class */ (function () {
    function Marigold(struct) {
        var _this = this;
        this.isHandledBySignatureHashHex = {};
        this.signedOrdersListsByPairIdHex = {};
        this.bellflower = new pollenium_bellflower_1.Bellflower(struct.provider);
        this.latency = struct.latency;
        this.engineReader = new pollenium_alchemilla_1.EngineReader({ provider: struct.provider, address: struct.engine });
        this.engineWriter = new pollenium_alchemilla_1.EngineWriter({
            signer: new ethers_1.ethers.Wallet(pollenium_uvaursi_1.Uu.wrap(struct.privateKey).u, struct.provider),
            address: struct.engine
        });
        this.bellflower.blockIndexSnowdrop.addHandle(function (blockIndex) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    Marigold.prototype.handleSignedOrder = function (signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('handleSignedOrder');
                if (this.getIsHandled(signedOrder)) {
                    return [2 /*return*/];
                }
                this.getSignedOrdersListByPair(__assign({}, signedOrder)).handleSignedOrder(signedOrder);
                return [2 /*return*/];
            });
        });
    };
    Marigold.prototype.getSignedOrdersListByPair = function (pair) {
        var pairIdHex = calcPairId(pair).toHex();
        if (this.signedOrdersListsByPairIdHex[pairIdHex] === undefined) {
            this.signedOrdersListsByPairIdHex[pairIdHex] = new SignedOrdersList_1.SignedOrdersList(pair);
        }
        return this.signedOrdersListsByPairIdHex[pairIdHex];
    };
    Marigold.prototype.getIsHandled = function (signedOrder) {
        if (this.isHandledBySignatureHashHex[signedOrder.getSignatureHash().uu.toHex()] === true) {
            return true;
        }
        else {
            return false;
        }
    };
    Marigold.prototype.getSignedOrdersLists = function () {
        var _this = this;
        var pairIdHexes = Object.keys(this.signedOrdersListsByPairIdHex);
        return pairIdHexes.map(function (pairIdHex) {
            return _this.signedOrdersListsByPairIdHex[pairIdHex];
        });
    };
    Marigold.prototype.removeExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bellflower.fetchLatestBlockIndex()];
                    case 1:
                        blockIndex = _a.sent();
                        this.getSignedOrdersLists().forEach(function (signedOrdersList) {
                            signedOrdersList.removeExpirationLte(blockIndex.opAdd(_this.latency));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Marigold.prototype.removeFilled = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var blockIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bellflower.fetchLatestBlockIndex()];
                    case 1:
                        blockIndex = _a.sent();
                        return [2 /*return*/, Promise.all(this.getSignedOrdersLists().map(function (signedOrdersList) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, signedOrdersList.removeFilled(stateFetcher)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                }
            });
        });
    };
    Marigold.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metaStateTracker, proposals, bestProposal, signedOrders, exchanges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metaStateTracker = new MetaStateTracker_1.MetaStateTracker(this.engineReader);
                        return [4 /*yield*/, this.removeExpired()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.removeFilled(metaStateTracker)];
                    case 2:
                        _a.sent();
                        proposals = [];
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.fetchBestProposal(metaStateTracker)];
                    case 4:
                        bestProposal = _a.sent();
                        if (bestProposal === null) {
                            return [3 /*break*/, 7];
                        }
                        proposals.push(bestProposal);
                        return [4 /*yield*/, metaStateTracker.incorporateProposal(bestProposal)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (proposals.length < 100) return [3 /*break*/, 3];
                        _a.label = 7;
                    case 7:
                        if (proposals.length === 0) {
                            console.log('nothing to execute');
                            return [2 /*return*/];
                        }
                        signedOrders = [];
                        exchanges = [];
                        proposals.forEach(function (proposal) {
                            var signedOrderPair = proposal.signedOrderPair, solution = proposal.solution;
                            var signedBuyyOrder = signedOrderPair.signedBuyyOrder, signedSellOrder = signedOrderPair.signedSellOrder;
                            if (signedOrders.indexOf(signedBuyyOrder) === -1) {
                                signedOrders.push(signedBuyyOrder);
                            }
                            if (signedOrders.indexOf(signedSellOrder) === -1) {
                                signedOrders.push(signedSellOrder);
                            }
                            exchanges.push(__assign({ signedBuyyOrderIndex: signedOrders.indexOf(signedBuyyOrder), signedSellOrderIndex: signedOrders.indexOf(signedSellOrder) }, solution));
                        });
                        return [4 /*yield*/, this.engineWriter.execute({ signedOrders: signedOrders, exchanges: exchanges })];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Marigold.prototype.fetchBestProposal = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var unsortedProposals, sortedProposals;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unsortedProposals = [];
                        return [4 /*yield*/, Promise.all(this.getSignedOrdersLists().map(function (signedOrdersList) { return __awaiter(_this, void 0, void 0, function () {
                                var _unsortedProposals;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, signedOrdersList.fetchProposals(stateFetcher)];
                                        case 1:
                                            _unsortedProposals = _a.sent();
                                            unsortedProposals.push.apply(unsortedProposals, _unsortedProposals);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        if (unsortedProposals.length === 0) {
                            return [2 /*return*/, null];
                        }
                        sortedProposals = unsortedProposals.sort(function (proposalA, proposalB) {
                            var quotTokenArbitA = proposalA.solution.quotTokenArbit;
                            var quotTokenArbitB = proposalB.solution.quotTokenArbit;
                            if (quotTokenArbitA.compGte(quotTokenArbitB)) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        });
                        return [2 /*return*/, sortedProposals[0]];
                }
            });
        });
    };
    return Marigold;
}());
exports.Marigold = Marigold;
