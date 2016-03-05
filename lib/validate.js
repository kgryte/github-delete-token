'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.username - Github username
* @param {String} options.password - Github password
* @param {String} [options.otp] - Github one-time password
* @param {String} [options.useragent] - user agent string
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.username = options.username;
	if ( !isString( opts.username ) ) {
		return new TypeError( 'invalid option. `username` option must be a string primitive. Option: `' + opts.username + '`.' );
	}
	opts.password = options.password;
	if ( !isString( opts.password ) ) {
		return new TypeError( 'invalid option. `password` option must be a string primitive. Option: `' + opts.password + '`.' );
	}
	if ( options.hasOwnProperty( 'otp' ) ) {
		opts.otp = options.otp;
		if ( !isString( opts.otp ) ) {
			return new TypeError( 'invalid option. `otp` option must be a string primitive. Option: `' + opts.otp + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
