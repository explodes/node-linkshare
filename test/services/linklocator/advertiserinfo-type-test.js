var unittest = require('reut');

var settings = require('../../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('advertiserinfo')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../../src/services/linklocator/advertiserinfo');
        	fixture.urls = require('../../../src/services/linklocator/urls');
        	done();
        })
        .test('getRestTypeByAPIType("mid") => "getMerchByID"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType('mid');

        	test.equal(result, "getMerchByID");
        })
        .test('getRestTypeByAPIType("name") => "getMerchByName"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType('name');

        	test.equal(result, "getMerchByName");
        })
        .test('getRestTypeByAPIType("category") => "getMerchByCategory"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType('category');

        	test.equal(result, "getMerchByCategory");
        })
        .test('getRestTypeByAPIType("status") => "getMerchByAppStatus"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType('status');

        	test.equal(result, "getMerchByAppStatus");
        })
        .test('getRestTypeByAPIType("abc") => "abc"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType('abc');

        	test.equal(result, "abc");
        })
        .test('getRestTypeByAPIType(1) => 1', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType(1);

        	test.equal(result, 1);
        })
        .test('getRestTypeByAPIType(undefind) => undefined', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestTypeByAPIType(undefined);

        	test.equal(result, undefined);
        })
        ;