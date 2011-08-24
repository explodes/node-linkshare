var unittest = require('reut');

var settings = require('../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('Some test suite.')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../src/api');
        	done();
        })
        .test('new api("foo", "bar") => {apitoken: "foo", securitytoken: "bar"}', function (test, fixture) {
        	logTest(test);

        	var api = new fixture.module('foo', 'bar');

			test.equal(api.apitoken, 'foo');
			test.equal(api.securitytoken, 'bar');
        })
        ;