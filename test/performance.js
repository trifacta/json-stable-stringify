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
         function(t) { stringify(obj); })
    .add('JSON stringify', function(t) { JSON.stringify(obj); })
    .on('cycle', function(event) { console.log(String(event.target)); })
    .on('complete',
        function() {
          console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
    .run({'async' : true});
