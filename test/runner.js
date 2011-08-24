var child = require('child_process');
var fs = require('fs');
var path = require('path');

var defaultRegex = /^[\w-]+-test\.js$/;

function displayUsage() {
	log(L.GUARANTEED, 'Usage: node test_runner.js [options] [directory]');
	log(L.GUARANTEED, '');
	log(L.GUARANTEED, 'Options:');
	log(L.GUARANTEED, ' -h, --help            Display usage and exit.');
	log(L.GUARANTEED, ' -v, --verbose         Increase verbosity level.  Can be used');
	log(L.GUARANTEED, '                       multiple times. Default: 1');
	log(L.GUARANTEED, ' -q, --quiet           No output except on error.');
	log(L.GUARANTEED, ' --no-output           No output, even on error.');
	log(L.GUARANTEED, ' -x, --fast-fail       Exit after the first test fails.');
	log(L.GUARANTEED, ' -t, --top-level-only  Run tests only immediately under the');
	log(L.GUARANTEED, '                       specified directory.');
	log(L.GUARANTEED, ' -e REGEX --tests REGEX');
	log(L.GUARANTEED, '                       Test files that match the given regex.');
	log(L.GUARANTEED, '                       Default: ' + defaultRegex);
	log(L.GUARANTEED, ' directory             Specify the directory to run tests');
	log(L.GUARANTEED, '                       under.')
	log(L.GUARANTEED, ' -                     Pass all following options to reut.');
}

// LOGLVEL
var L = {
   GUARANTEED : -1,
   NEVER      : 0,
   ERROR      : 1,
   WARN       : 2,
   FAIL       : 3,
   ALWAYS     : 4,
   VERBOSE    : 5,
   DEBUG      : 6
}

// LOGLEVELNAME
var N = {
   1 : 'ERROR',
   2 : 'WARN ',
   3 : 'FAIL ',
   4 : 'INFO ',
   5 : 'VERB '
}

var args = {
	displayUsage        : false,
	verbose             : L.ALWAYS,
	fastFail            : false,
	topLevelOnly        : false,
	topLevelDir         : path.dirname(__filename),
	testRegex           : defaultRegex,
	reutArgs            : []
};

function log(level, message) {
	
	var logFunc = level > L.FAIL || level < L.ERROR ? console.log : console.error;
	
	if (args.verbose >= level) {
		if (N[level] != undefined) {
			var prefix = N[level] + ': ';
			logFunc(prefix + message.toString().replace(/\n$/, '').replace(/\n/g, '\n' + prefix));
		} else {
			logFunc(message);
		}
	}
}

function relativeName(filepath) {
	var cwd = process.cwd();
	if (filepath.substr(0, cwd.length) == cwd) {
		filepath = filepath.substr(cwd.length);
	}
	if (filepath.charAt(0) == '/')
		return '.' + filepath;
	else
		return './' + filepath;
}

function getTestFiles(directory) {
	var files = [];
	getTestFilesRecursive(directory, files);
	return files;
}

function getTestFilesRecursive(directory, files) {
	var directories = [];
	var items = fs.readdirSync(directory);
	for (var index in items) {
		var item = items[index];
		var filePath = path.join(directory, item)
		var stat = fs.statSync(filePath);
		if (stat.isDirectory()){
			directories.push(filePath);
		} else if (stat.isFile() && item.match(args.testRegex)) {
			var relativePath = relativeName(filePath);
			files.push(relativePath);
		}
	}
	for (var index in directories) {
		var directory = directories[index];
		getTestFilesRecursive(directory, files);
	}
	
}

function runTests() {
	log(L.VERBOSE, 'Running tests under given directory: ' + args.topLevelDir);
	var files = getTestFiles(args.topLevelDir);
	log(L.DEBUG, 'DEBUG: Found test files:');
	log(L.DEBUG, files);
	
	if (files.length == 0) {
		log(L.ALWAYS, 'No test files found.');
		process.exit(0);
	}
	
	var index = 0;
	
	var assertions = 0;
	var passed = 0;
	var failed = 0;
	
	function logResults(level) {
		log(level, assertions + ' assertion(s), ' + passed + ' passed, ' + failed + ' failed.');
	}
	
	var resultRegex = new RegExp(/(\d+) assertion\(s\), (\d+) passed, (\d+) failed./);
	
	function runNext(code, newAssertions, newPassed, newFailed) {
		if (code !== 0) {
			if (code === null) {
				log(L.INFO, 'Test aborted due to unknown error. Retrying.');
				index--;
			} else {
				failed += 1;
			}
			log(L.FAIL, 'Test failed with status: ' + code);
			if (args.fastFail) process.exit(code);
		} else if (code != null) {
			assertions += newAssertions;
			passed += newPassed;
			failed += newFailed;
		}
		var file = files[index];
		if (index < files.length) {
			log(L.ALWAYS, 'Testing ' + file);
			var command_name = 'node';
			var subrunner = path.normalize(path.join(__dirname, './subrunner.js'));
			var command_args = [subrunner].concat([file].concat(args.reutArgs));
			log(L.DEBUG, command_name);
			log(L.DEBUG, command_args);
			var subprocess = child.spawn(command_name, command_args);
			var _assertions, _passed, _failed;
			subprocess.stderr.on('data', function(data){
				log(L.FAIL, data);
			});
			subprocess.stdout.on('data', function(data){
				var _data = data.toString();
				var match = _data.match(resultRegex); 
				if (match) {
					
					var fails = parseInt(match[3]);
					
					// REDIRECT STDOUT TO STDERR IF WE HAVE AN ERROR
					if (fails > 0) {
						log(L.FAIL, data);
					} else {
						log(L.ALWAYS, data);
					}
					
					_assertions = parseInt(match[1]);
					_passed = parseInt(match[2]);
					_failed = fails;
					if (args.fastFail && failed > 0) {
						log(L.FAIL, 'Failure detected.')
						log(L.FAIL, ' File: ' + file);
						logResults(L.FAIL);
						process.exit(1);
					}
				} else {
					log(L.ALWAYS, data);
				}
			});
			subprocess.on('exit', function(code) {
				runNext(code, _assertions, _passed, _failed);
			});
		} else {
			log(L.GUARANTEED, 'End of tests.');
			if (failed > 0) {
				logResults(L.GUARANTEED);
				process.exit(1);
			} else {
				logResults(L.GUARANTEED);
				process.exit(0);
			}
		}
		index++;
	}
	runNext(0,0,0,0);
}

function main() {
	parseArgs();
	log(L.DEBUG, args);
	if (args.displayUsage) {
		displayUsage();
		process.exit(0);
	} else {
		runTests();
	}
}

function parseArgs() {
	for (var index = 2; index < process.argv.length; index++) {
		var argument = process.argv[index];
		if (argument == '-') {
			args.reutArgs = process.argv.slice(index + 1);
			break;
		}else if (['-h', '--help'].indexOf(argument) != -1) {
			args.displayUsage = true;
		} else if (['-x', '--fast-fail'].indexOf(argument) != -1) {
			args.fastFail = true;
		} else if (['-v', '--verbose'].indexOf(argument) != -1) {
			args.verbose += 1;
		} else if (['-t', '--top-level-only'].indexOf(argument) != -1) {
			args.topLevelOnly = true;
		} else if (['-q', '--quiet'].indexOf(argument) != -1) {
			args.verbose = L.WARN;
		} else if (argument == '--no-output') {
			args.verbose = L.NEVER;
		} else if (['-e', '--tests'].indexOf(argument) != -1) {
			var parameter = process.argv[index+1];
			if (parameter != undefined && parameter[0] != '-') {
				args.testRegex = new RegExp(parameter);
				index++;
			} else {
				args.testRegex = undefined;
			}
		} else {
			args.topLevelDir = argument;
			args.isCustomTopLevelDir = true;
		}
	}
	if (args.testRegex == undefined && !args.displayUsage) {
		log(L.GUARANTEED, 'Must specify regex.');
		process.exit(2);
	}
}

if (require.main === module) {
	main();
}