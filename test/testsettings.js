/**
 * Settings to use when running tests.
 */

var optparse = require('optparse');

/**
 * Options, doubles as the default options.
 */
var options = {
	token : undefined,
}

function _defaultString(value) {
	if (value == undefined)
		return 'Default: none';
	else
		return 'Default: ' + value;
}

/**
 * The usage help.
 */
var switches = [
	['-h', '--help',   'Display help and quit.'],
	['--token STRING', 'Linkshare API token.' + _defaultString(options.token)],
];


function getBool(value, _defaultIfPresent) {
	if (value == undefined || value.charAt(0) == '-')
		return _defaultIfPresent;
	else {
		var _value = value.toString().toLowerCase();
		if (_value == 'true')
			return true;
		else if (_value == 'false')
			return false;
		else {
			console.error('Invalid boolean option "%s." Use true or false.', value);
			process.exit(1);
		}
	}
}

function _sanitizeInput(value) {
	if (value == undefined || value == null || (typeof value == 'string' && ['none', 'null', 'undefined'].indexOf(value.toLowerCase()) != -1)) {
		return undefined;
	}
	return value;
}

var parser = new optparse.OptionParser(switches);

// { PARSE

// SPECIALS

parser.on('help', function (opt, value) {
	console.error(parser.toString() + '\n');
	process.exit(0);
});

// STRINGS
parser.on('token', function (opt, value) { options[opt] = _sanitizeInput(value); });

// NUMBERS
//parser.on('foo', function (opt, value) { options[opt] = value; });

// BOOLS
//parser.on('bar', function (opt, value) { options[opt] = getBool(value, true); });

// }

parser.parse(process.argv);

module.exports = options;