'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var query = require( './query.js' );


// DELETE //

/**
* FUNCTION: del( id, options, clbk )
*	Deletes a token.
*
* @param {Number} id - token id
* @param {Object} options - function options
* @param {String} options.username - Github username
* @param {String} options.password - Github password
* @param {String} [options.otp] - Github one-time password
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for deleting a token
*/
function del( id, options, clbk ) {
	var opts;
	var err;
	if ( !isNonNegativeInteger( id ) ) {
		throw new TypeError( 'invalid input argument. Token id must be a nonnegative integer. Value: `' + id + '`.' );
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	query( id, opts, done );
	/**
	* FUNCTION: done( error, info )
	*	Callback invoked after receiving an API response.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} info - response info
	* @returns {Void}
	*/
	function done( error, info ) {
		error = error || null;
		info = info || null;
		clbk( error, info );
	} // end FUNCTION done()
} // end FUNCTION del()


// EXPORTS //

module.exports = del;
