var helpers = require('./helpers')
   ,urls    = require('./urls')
   ;

/**
 * bdate
 * edate
 * nid
 * reportid
 */
exports.service = function (token, params, callback) {
	var _clean = helpers.clean(params);
	_clean.token = token;
	helpers.request(urls.paymenthistoryHost, urls.paymenthistoryPath, _clean, true, callback);
}