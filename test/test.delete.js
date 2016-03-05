'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var del = require( './../lib/delete.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof del, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws if provided an invalid options argument', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			del( 1, {
				'username': value,
				'password': 'boop'
			}, noop );
		};
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			del( 1, opts, value );
		};
	}
});

tape( 'function throws if provided a token id argument which is not a nonnegative integer', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		-5,
		3.14,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			del( value, opts, noop );
		};
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when deleting a token (no rate limit info)', function test( t ) {
	var opts;
	var del;

	del = proxyquire( './../lib/delete.js', {
		'./query.js': query
	});

	opts = getOpts();
	del( 1, opts, done );

	function query( id, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when deleting a token', function test( t ) {
	var opts;
	var del;

	del = proxyquire( './../lib/delete.js', {
		'./query.js': query
	});

	opts = getOpts();
	del( 1, opts, done );

	function query( id, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), info );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var opts;
	var del;

	del = proxyquire( './../lib/delete.js', {
		'./query.js': query
	});

	expected = info;

	opts = getOpts();
	del( 1, opts, done );

	function query( id, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, info );
		}
	}

	function done( error, info ) {
		t.deepEqual( info, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback (error)', function test( t ) {
	var expected;
	var opts;
	var del;

	del = proxyquire( './../lib/delete.js', {
		'./query.js': query
	});

	expected = info;

	opts = getOpts();
	del( 1, opts, done );

	function query( id, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), info );
		}
	}

	function done( error, info ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );

		t.deepEqual( info, expected, 'deep equal' );

		t.end();
	}
});
