'use strict';

function getOpts() {
	var opts = {
		'username': 'beep',
		'password': 'boop',
		'hostname': 'api.github.com',
		'port': 443,
		'protocol': 'https'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
