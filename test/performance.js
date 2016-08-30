var Benchmark = require('benchmark'),
    stringify = require('../');

var suite = new Benchmark.Suite;

var obj = {
  c : 6,
  b : [ 4, {param : {col : [], sig : [ [ 'string' ] ]}, name : 'column1'} ],
  a : 3,
  d : {x : [ 0, 1, 2, 'string' ], y : {e : {level : 4}}, z : 1.1},
  s : true
};

suite
    .add('fast stable stringify',
         function(t) { stringify(obj, {space : '  '}); })
    .add('JSON stringify', function(t) { JSON.stringify(obj); })
    .on('cycle', function(event) { console.log(String(event.target)); })
    .on('complete',
        function() {
          console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
    .run({'async' : true});

/**
 * logs:
 *
 * Before getting rid of identation and options:
 *
 * => fast stable stringify x 30,711 ops/sec ±0.86% (88 runs sampled)
 * => JSON stringify x 346,700 ops/sec ±1.56% (88 runs sampled)
 *
 * After:
 *
 * => fast stable stringify x 52,130 ops/sec ±0.98% (85 runs sampled)
 * => JSON stringify x 348,935 ops/sec ±1.32% (78 runs sampled)
 */
