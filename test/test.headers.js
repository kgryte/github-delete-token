'use strict';

// MODULES //

var tape = require( 'tape' );
var headers = require( './../lib/headers.js' );


// FUNCTIONS //

function setup() {
	return {
		'username': 'beep',
		'password': 'boop'
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof headers, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an object', function test( t ) {
	t.equal( typeof headers( setup() ), 'object', 'returns an object' );
	t.end();
});

tape( 'if provided a `useragent` option, the function sets the `User-Agent` header', function test( t ) {
	var opts;
	var h;

	opts = setup();
	opts.useragent = 'beep-boop';

	h = headers( opts );

	t.equal( h[ 'User-Agent' ], opts.useragent, 'sets the `User-Agent` header' );
	t.end();
});

tape( 'if provided an `accept` option, the function sets the `Accept` header', function test( t ) {
	var opts;
	var h;

	opts = setup();
	opts.accept = 'application/vnd.github.v3+json';

	h = headers( opts );

	t.equal( h[ 'Accept' ], opts.accept, 'sets the `Accept` header' );
	t.end();
});

tape( 'the function sets the `Authorization` header', function test( t ) {
	var expected;
	var opts;
	var h;

	opts = setup();
	h = headers( opts );

	expected = 'Basic ' + new Buffer( opts.username+':'+opts.password ).toString( 'base64' );

	t.equal( h[ 'Authorization' ], expected, 'sets the `Authorization` header' );
	t.end();
});

tape( 'if provided an `otp` option, the function sets the `X-GitHub-OTP` header', function test( t ) {
	var opts;
	var h;

	opts = setup();
	opts.otp = '1234';

	h = headers( opts );

	t.equal( h[ 'X-GitHub-OTP' ], opts.otp, 'sets the `X-GitHub-OTP` header' );
	t.end();
});
