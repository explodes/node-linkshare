var unittest = require('reut');

var settings = require('../../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('productlinks')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../../src/services/linklocator/productlinks');
        	fixture.urls = require('../../../src/services/linklocator/urls');
        	done();
        })
        .test('getRestPath("abc", {mid: 123}) => "path/abc/123/-1/-1/1"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestPath('abc', {mid:123});

        	test.equal(result, fixture.urls.productlinksPath + '/abc/123/-1/-1/1');
        })
        .test('getRestPath("abc", {category: 123}) => "path/abc/-1/123/-1/1"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestPath('abc', {category:123});

        	test.equal(result, fixture.urls.productlinksPath + '/abc/-1/123/-1/1');
        })
        .test('getRestPath("abc", {page: 5}) => "path/abc/-1/-1/-1/5"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestPath('abc', {page: 5});

        	test.equal(result, fixture.urls.productlinksPath + '/abc/-1/-1/-1/5');
        })
        ;