"use strict";
exports.__esModule = true;
var Option_1 = require("fp-ts/lib/Option");
var Apply_1 = require("fp-ts/lib/Apply");
var fa = Option_1.some(1);
var fb = Option_1.some('foo');
var f = function (a) { return function (b) { return a + b.length > 2; }; };
var fc1 = Option_1.some(f)
    .ap_(fa)
    .ap_(fb);
var fc2 = fb.ap(fa.ap(Option_1.some(f)));
var fc3 = fb.ap(fa.map(f));
var fc4 = Apply_1.liftA2(Option_1.option)(f)(fa)(fb);
var fc5 = Apply_1.sequenceT(Option_1.option)(fa, fb).map(function (_a) {
    var a = _a[0], b = _a[1];
    return f(a)(b);
});
console.log('hi');
