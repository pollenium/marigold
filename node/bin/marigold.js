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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var __1 = require("../");
var ethers_1 = require("ethers");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_anemone_1 = require("pollenium-anemone");
var pollenium_ilex_1 = require("pollenium-ilex");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1["default"].config();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey, address, marigold, applicationId, anemoneClient;
        return __generator(this, function (_a) {
            privateKey = pollenium_uvaursi_1.Uu.fromHexish(process.env.PRIVATE_KEY_HEX);
            address = new pollenium_ilex_1.Keypair(privateKey).getAddress();
            console.log('===============================');
            console.log("executor: " + address.uu.toHex());
            console.log('===============================');
            marigold = new __1.Marigold({
                latency: 1,
                provider: new ethers_1.ethers.providers.InfuraProvider('homestead', '7c8a7e7164c247cd8ccb11a1525a6d9e'),
                privateKey: privateKey,
                engine: pollenium_xanthoceras_1.engine
            });
            applicationId = pollenium_uvaursi_1.Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32);
            anemoneClient = new pollenium_anemone_1.Client(__assign(__assign({}, pollenium_anemone_1.clientDefaults), { signalingServerUrls: [
                    'wss://begonia-us-1.herokuapp.com',
                    'wss://begonia-eu-1.herokuapp.com'
                ], sdpTimeout: 20, connectionTimeout: 20 }));
            anemoneClient.missiveSnowdrop.addHandle(function (missive) {
                if (!missive.applicationId.uu.getIsEqual(applicationId)) {
                    return;
                }
                var signedOrder = pollenium_alchemilla_1.SignedOrder.fromLigma(missive.applicationData);
                marigold.handleSignedOrder(signedOrder);
            });
            return [2 /*return*/];
        });
    });
}
run();
