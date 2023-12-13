"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
var color_1 = require("./color");
var Solver = /** @class */ (function () {
    function Solver(target, options) {
        this.target = target;
        this.targetHSL = target.hsl();
        this.options = Object.assign({}, 
        // Adding default values for options
        {
            acceptanceLossPercentage: 5,
            maxChecks: 15,
        }, options);
        // All the calcs done by the library to generate
        // a CSS Filter are based on the color `#000`
        // in this case, `rgb(0, 0, 0)`
        // Please make sure the background of the element
        // is `#000` for better performance
        // and color similarity.
        this.reusedColor = new color_1.Color(0, 0, 0);
    }
    /**
     * Returns the solved values for the
     *
     * @returns {(SPSAPayload & { filter: string; })}
     * @memberof Solver
     */
    Solver.prototype.solve = function () {
        var result = this.solveNarrow(this.solveWide());
        return {
            values: result.values,
            called: result.called,
            loss: result.loss,
            filter: this.css(result.values),
        };
    };
    /**
     * Solve wide values based on the wide values for RGB and HSL values
     *
     * @private
     * @returns {SPSAPayload}
     * @memberof Solver
     */
    Solver.prototype.solveWide = function () {
        var A = 5;
        var c = 15;
        // Wide values for RGB and HSL values
        // the values in the order: [`r`, `g`, `b`, `h`, `s`, `l`]
        var a = [60, 180, 18000, 600, 1.2, 1.2];
        var best = { loss: Infinity };
        var counter = 0;
        while (best.loss > this.options.acceptanceLossPercentage) {
            var initialFilterValues = [50, 20, 3750, 50, 100, 100];
            var result = this.spsa({
                A: A,
                a: a,
                c: c,
                values: initialFilterValues,
                // for wide values we should use the double of tries in
                // comparison of `solveNarrow()` method
                maxTriesInLoop: 1000,
            });
            if (result.loss < best.loss) {
                best = result;
            }
            counter += 1;
            if (counter >= this.options.maxChecks) {
                break;
            }
        }
        return Object.assign({}, best, { called: counter });
    };
    /**
     * Solve narrow values based on the wide values for the filter
     *
     * @private
     * @param {SPSAPayload} wide
     * @returns {SPSAPayload}
     * @memberof Solver
     */
    Solver.prototype.solveNarrow = function (wide) {
        var A = wide.loss;
        var c = 2;
        var A1 = A + 1;
        // Narrow values for RGB and HSL values
        // the values in the order: [`r`, `g`, `b`, `h`, `s`, `l`]
        var a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa({
            A: A,
            a: a,
            c: c,
            values: wide.values,
            maxTriesInLoop: 500,
            called: wide.called,
        });
    };
    /**
     * Returns final value based on the current filter order
     * to get the order, please check the returned value
     * in `css()` method
     *
     * @private
     * @param {number} value
     * @param {number} idx
     * @returns {number}
     * @memberof Solver
     */
    Solver.prototype.fixValueByFilterIDX = function (value, idx) {
        var max = 100;
        // Fixing max, minimum and value by filter
        if (idx === 2 /* saturate */) {
            max = 7500;
        }
        else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
            max = 200;
        }
        if (idx === 3 /* hue-rotate */) {
            if (value > max) {
                value %= max;
            }
            else if (value < 0) {
                value = max + (value % max);
            }
        }
        // Checking if value is below the minimum or above
        // the maximum allowed by filter
        else if (value < 0) {
            value = 0;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    };
    Solver.prototype.spsa = function (_a) {
        var A = _a.A, a = _a.a, c = _a.c, values = _a.values, _b = _a.maxTriesInLoop, maxTriesInLoop = _b === void 0 ? 500 : _b, _c = _a.called, called = _c === void 0 ? 0 : _c;
        var alpha = 1;
        var gamma = 0.16666666666666666;
        var best = null;
        var bestLoss = Infinity;
        var deltas = new Array(6);
        var highArgs = new Array(6);
        var lowArgs = new Array(6);
        // Size of all CSS filters to be applied to get the correct color
        var filtersToBeAppliedSize = 6;
        for (var key = 0; key < maxTriesInLoop; key++) {
            var ck = c / Math.pow(key + 1, gamma);
            for (var i = 0; i < filtersToBeAppliedSize; i++) {
                deltas[i] = Math.random() > 0.5 ? 1 : -1;
                highArgs[i] = values[i] + ck * deltas[i];
                lowArgs[i] = values[i] - ck * deltas[i];
            }
            var lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (var i = 0; i < filtersToBeAppliedSize; i++) {
                var g = (lossDiff / (2 * ck)) * deltas[i];
                var ak = a[i] / Math.pow(A + key + 1, alpha);
                values[i] = this.fixValueByFilterIDX(values[i] - ak * g, i);
            }
            var loss = this.loss(values);
            if (loss < bestLoss) {
                best = values.slice(0);
                bestLoss = loss;
            }
        }
        return { values: best, loss: bestLoss, called: called };
    };
    /**
     * Checks how much is the loss for the filter in RGB and HSL colors
     *
     * @private
     * @param {SPSAPayload['values']} filters
     * @returns {number}
     * @memberof Solver
     */
    Solver.prototype.loss = function (filters) {
        // Argument as an Array of percentages.
        var color = this.reusedColor;
        // Resetting the color to black in case
        // it was called more than once
        color.set(0, 0, 0);
        color.invert(filters[0] / 100);
        color.sepia(filters[1] / 100);
        color.saturate(filters[2] / 100);
        color.hueRotate(filters[3] * 3.6);
        color.brightness(filters[4] / 100);
        color.contrast(filters[5] / 100);
        var colorHSL = color.hsl();
        return (Math.abs(color.r - this.target.r) +
            Math.abs(color.g - this.target.g) +
            Math.abs(color.b - this.target.b) +
            Math.abs(colorHSL.h - this.targetHSL.h) +
            Math.abs(colorHSL.s - this.targetHSL.s) +
            Math.abs(colorHSL.l - this.targetHSL.l));
    };
    /**
     * Returns the CSS filter list for the received HEX color
     *
     * @private
     * @param {number[]} filters
     * @returns {string}
     * @memberof Solver
     */
    Solver.prototype.css = function (filters) {
        var formatCssFilterValueByMultiplier = function (idx, multiplier) {
            if (multiplier === void 0) { multiplier = 1; }
            return Math.round(filters[idx] * multiplier);
        };
        return [
            "invert(".concat(formatCssFilterValueByMultiplier(0), "%)"),
            "sepia(".concat(formatCssFilterValueByMultiplier(1), "%)"),
            "saturate(".concat(formatCssFilterValueByMultiplier(2), "%)"),
            "hue-rotate(".concat(formatCssFilterValueByMultiplier(3, 3.6), "deg)"),
            "brightness(".concat(formatCssFilterValueByMultiplier(4), "%)"),
            "contrast(".concat(formatCssFilterValueByMultiplier(5), "%);"),
        ].join(' ');
    };
    return Solver;
}());
exports.Solver = Solver;
