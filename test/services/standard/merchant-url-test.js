var unittest = require('reut');

var settings = require('../../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('merchant')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../../src/services/standard/merchantquery');
        	fixture.urls = require('../../../src/services/standard/urls');
        	done();
        })
        .test('makeUrl w/ keyword', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {keyword: 'foo'});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&keyword="foo"');
        })
        .test('makeUrl w/ category', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {category: 'foo'});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&cat="foo"');
        })
        .test('makeUrl w/ results', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {results: 1});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&MaxResults=1');
        })
        .test('makeUrl w/ page', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {page: 1});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&pagenumber=1');
        })
        .test('makeUrl w/ mid', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {mid: 1});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&mid=1');
        })
        .test('makeUrl w/ sort', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {sort: ['foo']});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&sort=foo&sorttype=asc');
        })
        .test('makeUrl w/ sort & sorttype', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {sort: ['foo'], sorttype: ['desc']});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&sort=foo&sorttype=desc');
        })
        .test('makeUrl w/ multiple sort & sorttype', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {sort: ['foo', 'bar'], sorttype: ['asc', 'desc']});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&sort=foo&sorttype=asc&sort=bar&sorttype=desc');
        })
        .test('makeUrl w/ mismatched sort & sorttype', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {sort: ['foo', 'bar'], sorttype: ['desc']});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&sort=foo&sorttype=desc&sort=bar&sorttype=asc');
        })
        .test('makeUrl w/ compound', function (test, fixture) {
        	logTest(test);

        	var result = fixture.module.makeUrl('abc', {keyword: 'foo', category: 'bar', results: 10, page: 5, mid: 6, sort: ['baz', 'boo'], sorttype: ['desc']});

        	test.equal(result, fixture.urls.merchantqueryPath + '?token=abc&keyword="foo"&cat="bar"&MaxResults=10&pagenumber=5&mid=6&sort=baz&sorttype=desc&sort=boo&sorttype=asc');
        })
        ;