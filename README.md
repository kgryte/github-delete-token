Delete Token
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Delete][github-delete-token] a Github OAuth access [token][github-token].


## Installation

``` bash
$ npm install github-delete-token
```


## Usage

``` javascript
var deleteToken = require( 'github-delete-token' );
```

<a name="delete-token"></a>
#### deleteToken( id, options, clbk )

[Deletes][github-delete-token] a Github OAuth access [token][github-token].

``` javascript
var tokenID = 1;

var opts = {
	'username': 'beep',
	'password': 'boop'	
};

deleteToken( tokenID, opts, clbk )

function clbk( error, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Success!' );
}
```

The `function` accepts the following `options`:
*	__username__: Github username (*required*).
* 	__password__: Github password (*required*).
*	__otp__: Github one-time password (2-factor authentication).
*	__useragent__: [user agent][github-user-agent] `string`.

The `function` __only__ supports basic authentication using a `username` and `password`. To [authenticate][github-oauth2] with Github, set the `username` and `password` options.

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop'
};

deleteToken( tokenID, opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop',
	'useragent': 'hello-github!'
};

deleteToken( tokenID, opts, clbk );
```

If a user has [two-factor authentication][github-two-factor] enabled, set the `otp` (one-time password) option.

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop',
	'otp': '1234'
};

deleteToken( tokenID, opts, clbk );
```


## Notes

*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var deleteToken = require( 'github-delete-token' );

var tokenID = 1;

var opts = {
	'username': '<username>',
	'password': '<password>',
	'otp': '<otp>',
	'useragent': 'beep-boop-bop'
};

deleteToken( tokenID, opts, clbk );

function clbk( error, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Success!' );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-delete-token
```


### Usage

``` bash
Usage: ghdeletetoken [options] token_id

Options:

  -h,  --help                      Print this message.
  -V,  --version                   Print the package version.
       --username username         Github username.
       --password password         Github password.
       --otp password              Github one-time password.
  -ua, --useragent ua              User agent.
```


### Notes

*	If a `username` is __not__ provided, the implementation will attempt to infer a username by executing

	```
	git config user.name
	```
	
	in the current working directory.
*	If a `password` is __not__ provided, the user will be prompted to provide a `password`.
*	In addition to the `username` and `password` options, a `username` and `password` may also be specified by `GITHUB_USERNAME` and `GITHUB_PASSWORD` environment variables. The command-line options __always__ take precedence.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting a username and password using the command-line options:

``` bash
$ DEBUG=* ghdeletetoken --username <username> --password <password> 1234
# => 'Deleted token 1234.'
```

Setting a username and password using environment variables:

``` bash
$ DEBUG=* GITHUB_USERNAME=<username> GITHUB_PASSWORD=<password> ghdeletetoken 1234
# => 'Deleted token 1234.'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghdeletetoken 1234
# => 'Deleted token 1234.'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli 1234
# => 'Deleted token 1234.'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-delete-token.svg
[npm-url]: https://npmjs.org/package/github-delete-token

[build-image]: http://img.shields.io/travis/kgryte/github-delete-token/master.svg
[build-url]: https://travis-ci.org/kgryte/github-delete-token

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-delete-token/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-delete-token?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-delete-token.svg
[dependencies-url]: https://david-dm.org/kgryte/github-delete-token

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-delete-token.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-delete-token

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-delete-token.svg
[github-issues-url]: https://github.com/kgryte/github-delete-token/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/
[github-delete-token]: https://developer.github.com/v3/oauth_authorizations/#delete-an-authorization
[github-two-factor]: https://help.github.com/articles/about-two-factor-authentication/
