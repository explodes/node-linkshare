/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=MTExOXxVc2luZyBXZWIgU2VydmljZXMgZm9yIFBheW1lbnQgUmVwb3J0cy5wZGY%3D
 * 
 * Payment History Summary
 * 
 * This report provides the payment amount, the date issued, the currency, and
 * other details on each consolidated payment you receive from LinkShare. It
 * also includes the Payment ID, which you will need if you want to run the
 * Advertiser Payments History and Payment Details Report.
 *
 * SAMPLE RESPONSE:
 * 
 * "Payment ID," "Date," "Payment Type," "Check Number," "Currency Code," Total Commission Amount Paid," "Payment Status" 
 * "883463," "5/19/2011," "Domestic (US) Direct Deposit," "DAC883463," "USD," "568.24," "Issued"
 *
 */

var helpers = require('../helpers')
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
	_clean.reportid = 1;
	helpers.request(urls.paymenthistoryHost, urls.paymenthistoryPath, _clean, true, callback);
}