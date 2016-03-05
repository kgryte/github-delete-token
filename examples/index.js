'use strict';

var deleteToken = require( './../lib' );

var token_id = 1;

var opts = {
	'username': '<username>',
	'password': '<password>',
	'otp': '<otp>',
	'useragent': 'beep-boop-bop'
};

deleteToken( token_id, opts, clbk );

function clbk( error, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Success!' );
}
