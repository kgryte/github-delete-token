'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-delete-token:headers' );


// HEADERS //

/**
* FUNCTION: headers( opts )
*	Returns request headers based on provided options.
*
* @param {Object} opts - provided options
* @param {String} opts.username - Github username
* @param {String} opts.password - Github password
* @param {String} [opts.otp] - Github one-time password
* @param {String} [opts.accept] - media type
* @param {String} [opts.useragent] - user agent string
* @returns {Object} request headers
*/
function headers( opts ) {
	var out = {};
	if ( opts.useragent ) {
		debug( 'User-Agent: %s', opts.useragent );
		out[ 'User-Agent' ] = opts.useragent;
	}
	if ( opts.accept ) {
		debug( 'Accept: %s', opts.accept );
		out[ 'Accept' ] = opts.accept;
	}
	out[ 'Authorization' ] = 'Basic ' + new Buffer( opts.username+':'+opts.password ).toString( 'base64' );
	if ( opts.otp ) {
		out[ 'X-GitHub-OTP' ] = opts.otp;
	}
	return out;
} // end FUNCTION headers()


// EXPORTS //

module.exports = headers;
