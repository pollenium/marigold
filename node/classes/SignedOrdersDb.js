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
var SignedOrdersListPair_1 = require("./SignedOrdersListPair");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_primrose_1 = require("pollenium-primrose");
var SignedOrdersDb = /** @class */ (function () {
    function SignedOrdersDb(struct) {
        this.signedOrders = {};
        this.blockNumber = new pollenium_buttercup_1.Uint256(struct.blockNumber);
        this.balancesDb = struct.balancesDb;
    }
    SignedOrdersDb.prototype.handleSignedOrder = function (signedOrder) {
        var quotTokenHex = signedOrder.quotToken.uu.toHex();
        var variTokenHex = signedOrder.variToken.uu.toHex();
        if (this.signedOrders[quotTokenHex] === undefined) {
            this.signedOrders[quotTokenHex] = {};
        }
        if (this.signedOrders[quotTokenHex][variTokenHex] === undefined) {
            this.signedOrders[quotTokenHex][variTokenHex] = new SignedOrdersListPair_1.SignedOrdersListPair({
                balancesDb: this.balancesDb
            });
        }
        this.signedOrders[quotTokenHex][variTokenHex].handleSignedOrder(signedOrder);
    };
    SignedOrdersDb.prototype.fetchExecutionRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var executionRequest, quotTokenHexes, i, quotTokenHex, variTokenHexes, j, variTokenHex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.executionRequestPrimrose) {
                            return [2 /*return*/, this.executionRequestPrimrose.promise];
                        }
                        this.executionRequestPrimrose = new pollenium_primrose_1.Primrose();
                        executionRequest = {
                            expiration: this.blockNumber,
                            signedBuyyOrders: [],
                            signedSellOrders: [],
                            exchanges: []
                        };
                        quotTokenHexes = Object.keys(this.signedOrders);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < quotTokenHexes.length)) return [3 /*break*/, 6];
                        quotTokenHex = quotTokenHexes[i];
                        variTokenHexes = Object.keys(this.signedOrders[quotTokenHex]);
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < variTokenHexes.length)) return [3 /*break*/, 5];
                        variTokenHex = variTokenHexes[j];
                        return [4 /*yield*/, this.signedOrders[quotTokenHex][variTokenHex].updateExecutionRequest(executionRequest)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3 /*break*/, 2];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.executionRequestPrimrose.resolve(executionRequest);
                        return [2 /*return*/, executionRequest];
                }
            });
        });
    };
    return SignedOrdersDb;
}());
exports.SignedOrdersDb = SignedOrdersDb;
