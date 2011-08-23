/**
 * Shared helper functions.
 */

var http        = require('http')
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

/**
 * Removed undefined properties and fixes multi-value attributes.
 */
exports.clean = function (parameters) {
	var result = {};
	for (var property in parameters)
		if (parameters[property] !== undefined)
			result[property] = exports.multiValue(parameters[property]);
	return result;
}
	
/**
 * Make an http request to a URL with the supplied GET parameters.
 * callback = void Function (error, results, response);
 */
exports.request = function (host, path, parameters, callback) {
	
	if (parameters)
		path = path + '?' + querystring.stringify(parameters);
	
	var options = {
	   host: host,
       port: 80,
       path: path,
       method: 'GET'
	};
	
	var error, response, results = '';
	
	var request = http.request(options, function (res) {
		response = res;
		
		res.on('data', function (chunk) {
			results += chunk;
		});
		
		res.on('error', function (err) {
			error = err;
		});
		
		res.on('end', function () {
			if (error || response.statusCode == 200)
				callback (error, results, response);
			else
				callback(response, results, response);
		});
		
	});
	
	request.end();
}