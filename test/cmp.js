var test = require('tape');
var stringify = require('../');

test('custom comparison function', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    var s = stringify(obj);
    t.equal(s, '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});
