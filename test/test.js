'use strict';

// MODULES //

var tape = require( 'tape' );
var deleteToken = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof deleteToken, 'function', 'main export is a function' );
	t.end();
});
