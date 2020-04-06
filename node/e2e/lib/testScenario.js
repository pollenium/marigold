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
var depositTo_1 = require("./depositTo");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var gaillardia_1 = require("./gaillardia");
var __1 = require("../../");
var genSignedOrder_1 = require("./genSignedOrder");
function testScenario(struct) {
    return __awaiter(this, void 0, void 0, function () {
        var engine, engineWriter, quotTokens, fetchBalance, depositTos, signedOrders, expected, i, depositToStruct, blockNumber, engineReader, batch, _a, _b, i, struct_1, signedOrder, executionRequest, i, struct_2, balance;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    engine = struct.engine, engineWriter = struct.engineWriter, quotTokens = struct.quotTokens, fetchBalance = struct.fetchBalance, depositTos = struct.depositTos, signedOrders = struct.signedOrders, expected = struct.expected;
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < depositTos.length)) return [3 /*break*/, 4];
                    depositToStruct = depositTos[i];
                    return [4 /*yield*/, depositTo_1.depositTo(__assign(__assign({}, depositToStruct), { engine: engine }))];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, gaillardia_1.gaillardia.fetchLatestBlockNumber()];
                case 5:
                    blockNumber = _c.sent();
                    engineReader = new pollenium_alchemilla_1.EngineReader({
                        provider: gaillardia_1.gaillardia.ethersWeb3Provider,
                        address: engine
                    });
                    _a = __1.Batch.bind;
                    _b = {};
                    return [4 /*yield*/, engineReader.fetchOrderSalt()];
                case 6:
                    batch = new (_a.apply(__1.Batch, [void 0, (_b.orderSalt = _c.sent(),
                            _b.expiration = blockNumber + 1,
                            _b.quotTokens = quotTokens,
                            _b.fetchBalance = fetchBalance,
                            _b)]))();
                    i = 0;
                    _c.label = 7;
                case 7:
                    if (!(i < signedOrders.length)) return [3 /*break*/, 10];
                    struct_1 = signedOrders[i];
                    signedOrder = genSignedOrder_1.genSignedOrder(struct_1.trader, __assign(__assign({}, struct_1.orderStruct), { expiration: blockNumber + 1 }));
                    return [4 /*yield*/, batch.handleSignedOrder(signedOrder)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10: return [4 /*yield*/, batch.fetchExecutionRequest()];
                case 11:
                    executionRequest = _c.sent();
                    expect(executionRequest.signedBuyyOrders.length).toBe(expected.signedBuyyOrdersLength);
                    expect(executionRequest.signedSellOrders.length).toBe(expected.signedSellOrdersLength);
                    expect(executionRequest.exchanges.length).toBe(expected.exchangesLength);
                    return [4 /*yield*/, engineWriter.execute(executionRequest)];
                case 12:
                    _c.sent();
                    i = 0;
                    _c.label = 13;
                case 13:
                    if (!(i < expected.balances.length)) return [3 /*break*/, 16];
                    struct_2 = expected.balances[i];
                    return [4 /*yield*/, engineReader.fetchBalance(__assign({}, struct_2))];
                case 14:
                    balance = _c.sent();
                    expect(balance.toNumber()).toBe(struct_2.balance);
                    _c.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.testScenario = testScenario;
