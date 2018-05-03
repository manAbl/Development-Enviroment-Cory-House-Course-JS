//This field is not transpiled, so must use commonJS and ES5

//Register Babel to transpile before test run.
require('babel-register')();

//Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
