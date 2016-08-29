var json = typeof JSON !== 'undefined' ? JSON : require('jsonify');

module.exports = function (obj) {
    var seen = [];
    return (function stringify (parent, key, node) {
        var colonSeparator = ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i]) || json.stringify(null);
                out.push(item);
            }
            return '[' + out.join(',') + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys = objectKeys(node).sort();
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key]);

                if(!value) continue;

                var keyValue = json.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(keyValue);
            }
            seen.splice( seen.indexOf(node), 1 );
            return '{' + out.join(',') + '}';
        }
    })({ '': obj }, '', obj);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () { return true };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};
