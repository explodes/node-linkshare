var unittest = require('reut');

var settings = require('../../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('creativecategories')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../../src/services/linklocator/creativecategories');
        	fixture.urls = require('../../../src/services/linklocator/urls');
        	done();
        })
        .test('getRestPath("abc", 123) => "path/token/mid"', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.getRestPath('abc', 123);

        	test.equal(result, fixture.urls.creativecategoriesPath + '/abc/123');
        })
        ;