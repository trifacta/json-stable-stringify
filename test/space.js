var test = require('tape');
var stringify = require('../');

test('space parameter', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2 };
    t.equal(stringify(obj), '{"one":1,"two":2}');
});

test('space parameter (with tabs)', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2 };
    t.equal(stringify(obj), '{"one":1,"two":2}');
});

test('space parameter (with a number)', function (t) {
    t.plan(1);
    var obj = { one: 1, two: 2 };
    t.equal(stringify(obj), '{"one":1,"two":2}');
});

test('space parameter (nested objects)', function (t) {
    t.plan(1);
    var obj = { one: 1, two: { b: 4, a: [2,3] } };
    t.equal(stringify(obj, {space : '  '}),
    '{"one":1,"two":{"a":[2,3],"b":4}}');
});

test('space parameter (same as native)', function (t) {
    t.plan(1);
    // for this test, properties need to be in alphabetical order
    var obj = { one: 1, two: { a: [2,3], b: 4 } };
    t.equal(stringify(obj), JSON.stringify(obj, null, ''));
});
