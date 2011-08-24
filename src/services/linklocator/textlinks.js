/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Text Links API
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * category
 * start
 * end
 * page
 */
exports.service = function (token, parameters, callback) {
	var restPath = exports.getRestPath(token, parameters);
	helpers.request(urls.textlinksHost, restPath, undefined, false, callback);
}

exports.getRestPath = function (token, parameters) {
	return urls.textlinksPath + 
			'/' + token + 
			'/' + (parameters.mid != undefined ? parameters.mid : '-1') +
			'/' + (parameters.category != undefined ? parameters.category : '-1') +
			'/' + (parameters.start != undefined ? helpers.toMMDDYYYY(parameters.start) : '') +
			'/' + (parameters.end != undefined ? helpers.toMMDDYYYY(parameters.end) : '') +
			'/-1' + // campaignID defunct as of August 2011
			'/' + (parameters.page != undefined ? parameters.page : '1');
}