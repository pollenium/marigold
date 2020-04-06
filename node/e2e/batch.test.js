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
var __1 = require("../");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var gaillardia_1 = require("./lib/gaillardia");
var keypairs_1 = require("./lib/keypairs");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var deployToken_1 = require("./lib/deployToken");
var pollenium_ursinia_1 = require("pollenium-ursinia");
var testScenario_1 = require("./lib/testScenario");
var genSignedOrder_1 = require("./lib/genSignedOrder");
var provider = gaillardia_1.gaillardia.ethersWeb3Provider;
var snapshotId;
var engine;
var engineReader;
var engineWriter;
var orderSalt;
var monarchicExecutorOracle;
var dai;
var daiReader;
var coinA;
var coinAReader;
var fetchBalance = function (struct) {
    return engineReader.fetchBalance({
        token: struct.token,
        holder: struct.trader
    });
};
test('deploy engineReader', function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.EngineDeployer({
                    signer: gaillardia_1.gaillardia.genWallet(keypairs_1.admin.privateKey)
                }).deploy()];
            case 1:
                address = (_a.sent()).address;
                engine = address;
                engineReader = new pollenium_alchemilla_1.EngineReader({
                    provider: provider,
                    address: address
                });
                engineWriter = new pollenium_alchemilla_1.EngineWriter({
                    signer: gaillardia_1.gaillardia.genWallet(keypairs_1.executorHot.privateKey),
                    address: address
                });
                return [4 /*yield*/, engineReader.fetchOrderSalt()];
            case 2:
                orderSalt = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('deploy monarchicExecutorOracle / set hot / set cold', function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.MonarchicExecutorOracleDeployer({
                    signer: gaillardia_1.gaillardia.genWallet(keypairs_1.admin.privateKey)
                }).deploy()];
            case 1:
                address = (_a.sent()).address;
                monarchicExecutorOracle = address;
                return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                        signer: gaillardia_1.gaillardia.genWallet(keypairs_1.admin.privateKey),
                        address: engine
                    }).setExecutorOracle(address)];
            case 2:
                _a.sent();
                return [4 /*yield*/, new pollenium_alchemilla_1.MonarchicExecutorOracleWriter({
                        signer: gaillardia_1.gaillardia.genWallet(keypairs_1.admin.privateKey),
                        address: address
                    }).setHot(keypairs_1.executorHot.getAddress())];
            case 3:
                _a.sent();
                return [4 /*yield*/, new pollenium_alchemilla_1.MonarchicExecutorOracleWriter({
                        signer: gaillardia_1.gaillardia.genWallet(keypairs_1.admin.privateKey),
                        address: address
                    }).setCold(keypairs_1.executorCold.getAddress())];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('deploy dai', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, tokenReader;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, deployToken_1.deployToken({ totalSupply: 100, engine: engine })];
            case 1:
                _a = _b.sent(), address = _a.address, tokenReader = _a.tokenReader;
                dai = address;
                daiReader = tokenReader;
                return [2 /*return*/];
        }
    });
}); });
test('deploy coinA', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, tokenReader;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, deployToken_1.deployToken({ totalSupply: 100, engine: engine })];
            case 1:
                _a = _b.sent(), address = _a.address, tokenReader = _a.tokenReader;
                coinA = address;
                coinAReader = tokenReader;
                return [2 /*return*/];
        }
    });
}); });
test('take snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 1:
                snapshotId = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('empty batch', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber, batch, executionRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.fetchLatestBlockHash()];
            case 1:
                blockNumber = _a.sent();
                batch = new __1.Batch({
                    orderSalt: orderSalt,
                    blockNumber: blockNumber,
                    quotTokens: [],
                    fetchBalance: fetchBalance
                });
                return [4 /*yield*/, batch.fetchExecutionRequest()];
            case 2:
                executionRequest = _a.sent();
                expect(new pollenium_buttercup_1.Uint256(executionRequest.blockNumber).uu.getIsEqual(blockNumber)).toBe(true);
                expect(executionRequest.signedSellOrders.length).toBe(0);
                expect(executionRequest.signedBuyyOrders.length).toBe(0);
                expect(executionRequest.exchanges.length).toBe(0);
                return [2 /*return*/];
        }
    });
}); });
test('InvalidQuotTokenError', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber, batch, signedBuyyOrder0;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, gaillardia_1.gaillardia.fetchLatestBlockHash()];
            case 1:
                blockNumber = _a.sent();
                batch = new __1.Batch({
                    orderSalt: orderSalt,
                    blockNumber: blockNumber,
                    quotTokens: [coinA],
                    fetchBalance: fetchBalance
                });
                signedBuyyOrder0 = genSignedOrder_1.genSignedOrder(keypairs_1.alice, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                    expiration: blockNumber,
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                return [4 /*yield*/, expect(batch.handleSignedOrder(signedBuyyOrder0)).rejects.toThrow(__1.InvalidQuotTokenError)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('InvalidBlockNumberError', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber, batch, signedBuyyOrder0;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                blockNumber = 0;
                batch = new __1.Batch({
                    orderSalt: orderSalt,
                    blockNumber: blockNumber,
                    quotTokens: [coinA],
                    fetchBalance: fetchBalance
                });
                signedBuyyOrder0 = genSignedOrder_1.genSignedOrder(keypairs_1.alice, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                    expiration: pollenium_uvaursi_1.Uu.genRandom(32),
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                return [4 /*yield*/, expect(batch.handleSignedOrder(signedBuyyOrder0)).rejects.toThrow(__1.InvalidBlockNumberError)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('two buyy orders', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber, batch, signedBuyyOrder0, signedBuyyOrder1, executionRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                blockNumber = pollenium_uvaursi_1.Uu.genRandom(32);
                batch = new __1.Batch({
                    orderSalt: orderSalt,
                    blockNumber: blockNumber,
                    quotTokens: [dai],
                    fetchBalance: fetchBalance
                });
                signedBuyyOrder0 = genSignedOrder_1.genSignedOrder(keypairs_1.alice, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                    expiration: blockNumber,
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                signedBuyyOrder1 = genSignedOrder_1.genSignedOrder(keypairs_1.bob, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                    expiration: blockNumber,
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                return [4 /*yield*/, batch.handleSignedOrder(signedBuyyOrder0)];
            case 3:
                _a.sent();
                return [4 /*yield*/, batch.handleSignedOrder(signedBuyyOrder1)];
            case 4:
                _a.sent();
                return [4 /*yield*/, batch.fetchExecutionRequest()];
            case 5:
                executionRequest = _a.sent();
                expect(executionRequest.signedBuyyOrders.length).toBe(0);
                expect(executionRequest.signedSellOrders.length).toBe(0);
                expect(executionRequest.exchanges.length).toBe(0);
                return [2 /*return*/];
        }
    });
}); });
test('single buy/sell order (no balance)', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockNumber, batch, signedBuyyOrder0, signedSellOrder0, executionRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                blockNumber = pollenium_uvaursi_1.Uu.genRandom(32);
                batch = new __1.Batch({
                    orderSalt: orderSalt,
                    blockNumber: blockNumber,
                    quotTokens: [dai],
                    fetchBalance: fetchBalance
                });
                signedBuyyOrder0 = genSignedOrder_1.genSignedOrder(keypairs_1.alice, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                    expiration: blockNumber,
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                signedSellOrder0 = genSignedOrder_1.genSignedOrder(keypairs_1.bob, {
                    salt: orderSalt,
                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                    expiration: blockNumber,
                    quotToken: dai,
                    variToken: coinA,
                    tokenLimit: 10,
                    priceNumer: 5,
                    priceDenom: 1
                });
                return [4 /*yield*/, batch.handleSignedOrder(signedBuyyOrder0)];
            case 3:
                _a.sent();
                return [4 /*yield*/, batch.handleSignedOrder(signedSellOrder0)];
            case 4:
                _a.sent();
                return [4 /*yield*/, batch.fetchExecutionRequest()];
            case 5:
                executionRequest = _a.sent();
                expect(executionRequest.signedBuyyOrders.length).toBe(0);
                expect(executionRequest.signedSellOrders.length).toBe(0);
                expect(executionRequest.exchanges.length).toBe(0);
                return [2 /*return*/];
        }
    });
}); });
test('single buy/sell order (sufficient balance)', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                return [4 /*yield*/, testScenario_1.testScenario({
                        engine: engine,
                        engineWriter: engineWriter,
                        fetchBalance: fetchBalance,
                        quotTokens: [dai],
                        depositTos: [{
                                token: dai,
                                holder: keypairs_1.alice.getAddress(),
                                amount: 20
                            }, {
                                token: coinA,
                                holder: keypairs_1.bob.getAddress(),
                                amount: 10
                            }],
                        signedOrders: [
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.bob,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            }
                        ],
                        expected: {
                            signedBuyyOrdersLength: 1,
                            signedSellOrdersLength: 1,
                            exchangesLength: 1,
                            balances: [{
                                    holder: keypairs_1.alice.getAddress(),
                                    token: dai,
                                    balance: 10
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: dai,
                                    balance: 10
                                }, {
                                    holder: keypairs_1.alice.getAddress(),
                                    token: coinA,
                                    balance: 2
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: coinA,
                                    balance: 8
                                }]
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 30 * pollenium_ursinia_1.THOUSAND);
test('single buy/sell order (partial balance)', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                return [4 /*yield*/, testScenario_1.testScenario({
                        engine: engine,
                        engineWriter: engineWriter,
                        fetchBalance: fetchBalance,
                        quotTokens: [dai],
                        depositTos: [{
                                token: dai,
                                holder: keypairs_1.alice.getAddress(),
                                amount: 5
                            }, {
                                token: coinA,
                                holder: keypairs_1.bob.getAddress(),
                                amount: 10
                            }],
                        signedOrders: [
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.bob,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            }
                        ],
                        expected: {
                            signedBuyyOrdersLength: 1,
                            signedSellOrdersLength: 1,
                            exchangesLength: 1,
                            balances: [{
                                    holder: keypairs_1.alice.getAddress(),
                                    token: dai,
                                    balance: 0
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: dai,
                                    balance: 5
                                }, {
                                    holder: keypairs_1.alice.getAddress(),
                                    token: coinA,
                                    balance: 1
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: coinA,
                                    balance: 9
                                }]
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 30 * pollenium_ursinia_1.THOUSAND);
test('2 buy/ 1 sell order (sufficient balance)', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                return [4 /*yield*/, testScenario_1.testScenario({
                        engine: engine,
                        engineWriter: engineWriter,
                        fetchBalance: fetchBalance,
                        quotTokens: [dai],
                        depositTos: [{
                                token: dai,
                                holder: keypairs_1.alice.getAddress(),
                                amount: 100
                            }, {
                                token: coinA,
                                holder: keypairs_1.bob.getAddress(),
                                amount: 100
                            }],
                        signedOrders: [
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 5,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.bob,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            }
                        ],
                        expected: {
                            signedBuyyOrdersLength: 2,
                            signedSellOrdersLength: 1,
                            exchangesLength: 2,
                            balances: [{
                                    holder: keypairs_1.alice.getAddress(),
                                    token: dai,
                                    balance: 85
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: dai,
                                    balance: 15
                                }, {
                                    holder: keypairs_1.alice.getAddress(),
                                    token: coinA,
                                    balance: 3
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: coinA,
                                    balance: 97
                                }]
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 30 * pollenium_ursinia_1.THOUSAND);
test('2 buy/ 1 sell order (sufficient balance/partial balance)', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                return [4 /*yield*/, testScenario_1.testScenario({
                        engine: engine,
                        engineWriter: engineWriter,
                        fetchBalance: fetchBalance,
                        quotTokens: [dai],
                        depositTos: [{
                                token: dai,
                                holder: keypairs_1.alice.getAddress(),
                                amount: 10
                            }, {
                                token: coinA,
                                holder: keypairs_1.bob.getAddress(),
                                amount: 100
                            }],
                        signedOrders: [
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 5,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.bob,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 10,
                                    priceNumer: 5,
                                    priceDenom: 1
                                }
                            }
                        ],
                        expected: {
                            signedBuyyOrdersLength: 2,
                            signedSellOrdersLength: 1,
                            exchangesLength: 2,
                            balances: [{
                                    holder: keypairs_1.alice.getAddress(),
                                    token: dai,
                                    balance: 0
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: dai,
                                    balance: 10
                                }, {
                                    holder: keypairs_1.alice.getAddress(),
                                    token: coinA,
                                    balance: 2
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: coinA,
                                    balance: 98
                                }]
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 30 * pollenium_ursinia_1.THOUSAND);
test('2 buy (2 buyers)/ 1 sell order (should order highest arb first)', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 2:
                snapshotId = _a.sent();
                return [4 /*yield*/, testScenario_1.testScenario({
                        engine: engine,
                        engineWriter: engineWriter,
                        fetchBalance: fetchBalance,
                        quotTokens: [dai],
                        depositTos: [{
                                token: dai,
                                holder: keypairs_1.alice.getAddress(),
                                amount: 10
                            }, {
                                token: dai,
                                holder: keypairs_1.bob.getAddress(),
                                amount: 10
                            }, {
                                token: coinA,
                                holder: keypairs_1.charlie.getAddress(),
                                amount: 10
                            }],
                        signedOrders: [
                            {
                                trader: keypairs_1.alice,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 3,
                                    priceNumer: 3,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.bob,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.BUYY,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 4,
                                    priceNumer: 4,
                                    priceDenom: 1
                                }
                            },
                            {
                                trader: keypairs_1.charlie,
                                orderStruct: {
                                    salt: orderSalt,
                                    direction: pollenium_alchemilla_1.ORDER_TYPE.SELL,
                                    quotToken: dai,
                                    variToken: coinA,
                                    tokenLimit: 1,
                                    priceNumer: 3,
                                    priceDenom: 1
                                }
                            }
                        ],
                        expected: {
                            signedBuyyOrdersLength: 1,
                            signedSellOrdersLength: 1,
                            exchangesLength: 1,
                            balances: [{
                                    holder: keypairs_1.alice.getAddress(),
                                    token: dai,
                                    balance: 10
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: dai,
                                    balance: 6
                                }, {
                                    holder: keypairs_1.charlie.getAddress(),
                                    token: dai,
                                    balance: 3
                                }, {
                                    holder: keypairs_1.executorCold.getAddress(),
                                    token: dai,
                                    balance: 1
                                }, {
                                    holder: keypairs_1.alice.getAddress(),
                                    token: coinA,
                                    balance: 0
                                }, {
                                    holder: keypairs_1.bob.getAddress(),
                                    token: coinA,
                                    balance: 1
                                }, {
                                    holder: keypairs_1.charlie.getAddress(),
                                    token: coinA,
                                    balance: 9
                                }, {
                                    holder: keypairs_1.executorCold.getAddress(),
                                    token: coinA,
                                    balance: 0
                                }]
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 30 * pollenium_ursinia_1.THOUSAND);
