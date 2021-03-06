/**
 * Shared helper functions.
 */

var http        = require('http')
   ,https       = require('https')
   ,querystring = require('querystring')
   ;

/**
 * Takes a value, if it is an array, returns "value[n]|value[n+1]|value[n...]"
 * If it is undefined, returns _default.
 */ 
exports.multiValue = function (value, _default) {
	 if (value === undefined)
		 return _default;
	 else if (Array.isArray(value)) 
		 return value.join('|');
	 else 
		 return value;
}

function pad(string, char, length) {
	string = string.toString();
	while (string.length < length) {
		string = char + string;
	}
	return string;
}

function getYMD(value) {
	var y = pad(value.getFullYear(), '0', 4);
	var m = pad(value.getMonth() + 1, '0', 2);
	var d = pad(value.getDate(), '0', 2);
	return [y, m, d];
}
	
/**
 * If the input is a Date, returns the date formated as YYYYMMDD.
 * Otherwise, echos the value.
 */
exports.toYYYYMMDD = function (value) {
	// Stupid hack. (require('./src/services/helpers')).toYYYYMMDD(new Date); returns the date object if this line is just if (value instanceof Date)
	if (typeof value == 'object' && value.getFullYear && value.getMonth && value.getDate) { 
		var ymd = getYMD(value);
		return ymd[0] + ymd[1] + ymd[2];
	}
	else {
		return value;
	}
}

/**
 * If the input is a Date, returns the date formated as MMDDYYYY.
 * Otherwise, echos the value.
 */
exports.toMMDDYYYY = function (value) {
	// Stupid hack. (require('./src/services/helpers')).toYYYYMMDD(new Date); returns the date object if this line is just if (value instanceof Date)
	if (typeof value == 'object' && value.getFullYear && value.getMonth && value.getDate) { 
		var ymd = getYMD(value);
		return ymd[1] + ymd[2] + ymd[0];
		return m + d + y;
	}
	else {
		return value;
	}
}

/**
 * Removed undefined properties.
 * Fixes multi-value attributes.
 * Fixes Date attributes.
 */
exports.clean = function (parameters) {
	var result = {};
	for (var property in parameters)
		if (parameters[property] !== undefined) {
			result[property] = exports.multiValue(parameters[property]);
			result[property] = exports.toYYYYMMDD(result[property]);
		}
	return result;
}
	
/**
 * Make an http request to a URL with the supplied GET parameters.
 * callback = void Function (error, results, response);
 */
exports.request = function (host, path, parameters, secure, callback) {
	if (parameters)
		path = path + '?' + querystring.stringify(parameters);
	
	var options = {
	   host: host,
       path: path
    };
	
	var error, response, results = '', func = secure ? https.get : http.get
	
	var request = func(options, function (res) {
		response = res;
		res.on('data', function (chunk) {
			results += chunk;
		})
		.on('error', function (err) {
			error = err;
		})
		.on('end', function () {
			if (callback) {
				if (error || response.statusCode == 200)
					callback (error, results, response);
				else
					callback(response, results, response);
			}
		});
	})
	.on('error', function (err) {
		error = err;
	});;
	
}