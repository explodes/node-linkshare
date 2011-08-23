/**
 * Run a single reut test.
 */

var reut = require('reut');
 
function run() {
	var filename = process.argv[2];
	var module = '../' + filename.replace(/\.(?:js|node)$/, '');
	require(module);
	reut.run(function(err) {
		if (err) throw err;
	});
}

run();