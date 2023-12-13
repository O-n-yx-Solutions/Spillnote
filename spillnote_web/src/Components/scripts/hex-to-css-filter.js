"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.hexToCSSFilter = void 0;
var solver_1 = require("./solver");
var color_1 = require("./color");
/**
 * Transform a CSS Color from Hexadecimal to RGB color
 *
 * @param {string} hex hexadecimal color
 * @returns {([number, number, number] | [])} array with the RGB colors or empty array
 */
var hexToRgb = function (hex) {
    if (hex.length === 4) {
        return [parseInt("0x".concat(hex[1]).concat(hex[1])), parseInt("0x".concat(hex[2]).concat(hex[2])), parseInt("0x".concat(hex[3]).concat(hex[3]))];
    }
    if (hex.length === 7) {
        return [parseInt("0x".concat(hex[1]).concat(hex[2])), parseInt("0x".concat(hex[3]).concat(hex[4])), parseInt("0x".concat(hex[5]).concat(hex[6]))];
    }
    return [];
};
var isNumeric = function (n) { return !isNaN(parseFloat(n)) && isFinite(n); };
// Memory cache for the computed results to avoid multiple
// calculations for the same color
var results = {};
/**
 * A function that transforms a HEX color into CSS filters
 *
 * @param colorValue string hexadecimal color
 * @param opts HexToCssConfiguration function configuration
 *
 */
var hexToCSSFilter = function (colorValue, opts) {
    var _a;
    if (opts === void 0) { opts = {}; }
    var red;
    var green;
    var blue;
    if (results[colorValue] && !opts.forceFilterRecalculation) {
        return Object.assign({}, results[colorValue], { cache: true });
    }
    var color;
    try {
        _a = hexToRgb(colorValue), red = _a[0], green = _a[1], blue = _a[2];
        if (!isNumeric(red) || !isNumeric(green) || !isNumeric(blue)) {
            throw new Error("hextToRgb returned an invalid value for '".concat(colorValue, "'"));
        }
        color = new color_1.Color(Number(red), Number(green), Number(blue));
    }
    catch (error) {
        throw new Error("Color value should be in HEX format. ".concat(error));
    }
    var solver = new solver_1.Solver(color, Object.assign({}, 
    // `HexToCssConfiguration` Defaults
    {
        acceptanceLossPercentage: 5,
        maxChecks: 30,
        forceFilterRecalculation: false,
    }, opts));
    return (results[colorValue] = Object.assign({}, solver.solve(), {
        hex: colorValue,
        rgb: [red, green, blue],
        cache: false,
    }));
};
exports.hexToCSSFilter = hexToCSSFilter;
/**
 * A function that clears cached results
 *
 * @param  {string} key? HEX string value passed previously `#24639C`. If not passed, it clears all cached results
 * @returns void
 */
var clearCache = function (key) {
    if (!key) {
        results = {};
    }
    else if (results[key]) {
        delete results[key];
    }
};
exports.clearCache = clearCache;
