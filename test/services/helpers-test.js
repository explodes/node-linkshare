var unittest = require('reut');

var settings = require('../testsettings');

var testNo = 0;
function logTest(test) {
	console.log('TEST #%d: %s', ++testNo, test.desc);
}

unittest.suite('helpers')
        .startup(function (fixture, done) {
        	// Called before EVERY test begins.
        	fixture.module = require('../../src/services/helpers');
        	done();
        })
        .test('multiValue(["a", "b", "c"]) => "a|b|c"', function (test, fixture) {
        	logTest(test);

        	test.equal(fixture.module.multiValue(['a', 'b', 'c']), 'a|b|c');
        })
        .test('multiValue("a") => "a"', function (test, fixture) {
        	logTest(test);

        	test.equal(fixture.module.multiValue('a'), 'a');
        })
        .test('multiValue("1") => 1', function (test, fixture) {
        	logTest(test);

        	test.equal(fixture.module.multiValue(1), 1);
        })
        .test('multiValue(undefined) => undefined', function (test, fixture) {
        	logTest(test);

        	test.equal(fixture.module.multiValue(undefined), undefined);
        })
        .test('toYYYYMMDD(new Date(2011, 0, 8)) => "20110108" (month is off-by-one)', function (test, fixture) {
        	logTest(test);
        	
        	var date = new Date(2011, 0, 8);

        	test.equal(fixture.module.toYYYYMMDD(date), '20110108');
        })
        .test('toYYYYMMDD("a") => "a"', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toYYYYMMDD('a'), 'a');
        })
        .test('toYYYYMMDD(1) => 1', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toYYYYMMDD(1), 1);
        })
        .test('toYYYYMMDD(undefined) => undefined', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toYYYYMMDD(undefined), undefined);
        })
        .test('toMMDDYYYY(new Date(2011, 0, 8)) => "01082011" (month is off-by-one)', function (test, fixture) {
        	logTest(test);
        	
        	var date = new Date(2011, 0, 8);

        	test.equal(fixture.module.toMMDDYYYY(date), '01082011');
        })
        .test('toMMDDYYYY("a") => "a"', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toMMDDYYYY('a'), 'a');
        })
        .test('toMMDDYYYY(1) => 1', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toMMDDYYYY(1), 1);
        })
        .test('toMMDDYYYY(undefined) => undefined', function (test, fixture) {
        	logTest(test);
        	
        	test.equal(fixture.module.toMMDDYYYY(undefined), undefined);
        })
        .test('clean({foo: new Date(2011, 0, 8)}) => {foo: "20110108"}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({foo: new Date(2011, 0, 8)});
        	
        	for (var prop in results)
        		if (prop != 'foo')
        			test.ok(false, 'There should be no properties but foo in the resulting object.');
        	
        	test.equal(results.foo, '20110108');
        })
        
        .test('clean({foo: ["a", "b", "c"]}) => {foo: "a|b|c"}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({foo: ["a", "b", "c"]});
        	
        	for (var prop in results)
        		if (prop != 'foo')
        			test.ok(false, 'There should be no properties but foo in the resulting object.');
        	
        	test.equal(results.foo, 'a|b|c');
        })
        .test('clean({foo: 1}) => {foo: 1}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({foo: 1});
        	
        	for (var prop in results)
        		if (prop != 'foo')
        			test.ok(false, 'There should be no properties but foo in the resulting object.');
        	
        	test.equal(results.foo, 1);
        })
        
        .test('clean({foo: "a"}) => {foo: "a"}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({foo: 'a'});
        	
        	for (var prop in results)
        		if (prop != 'foo')
        			test.ok(false, 'There should be no properties but foo in the resulting object.');
        	
        	test.equal(results.foo, "a");
        })
        .test('clean({foo: undefined}) => {}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({foo: undefined});
        	
        	for (var prop in results)
        		test.ok(false, 'There should be no properties in the resulting object.');
        	
			test.notEqual(results, undefined);
        })
        .test('clean({}) => {}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean({});
        	
        	for (var prop in results)
        		test.ok(false, 'There should be no properties in the resulting object.');
        	
        	test.notEqual(results, undefined);
        })
        .test('clean(undefined) => {}', function (test, fixture) {
        	logTest(test);
        	
        	var results = fixture.module.clean(undefined);
        	
        	for (var prop in results)
    			test.ok(false, 'There should be no properties but foo in the resulting object.');
        	
        	test.notEqual(results, undefined);
        })
        ;