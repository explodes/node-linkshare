/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=MTExOXxVc2luZyBXZWIgU2VydmljZXMgZm9yIFBheW1lbnQgUmVwb3J0cy5wZGY%3D
 * 
 * Advertiser Payments History
 * This report shows all the advertisers who paid you during a specific time
 * period, the amount they paid you, and other details.
 * 
 * token
 * This is your Security token. It can be found on the Publisher Dashboard by 
 * going to Links > Web Services.
 * Please note: the Security token differs from the Web Services token.

 * reportid
 * This identifies the report you are requesting.
 * Advertiser Payments History = 2
 *
 * payid
 * This is the unique number that LinkShare assigns to every payment. It can be
 * retrieved from the Payment History Summary.
 * 
 * SAMPLE RESPONSE:
 * 
 * "Advertiser ID," "Advertiser," "Invoice Number," "Transaction Commissions," "CPM & CPC Commissions," "Adjustments," "Payment Amount," "Advertiser Payment Date"
 * "34290," "Auto Parts Warehouse," 1142851," "0," "0," "0," "289.8412," "4/25/2011"
 */

var helpers = require('./helpers')
   ,urls    = require('./urls')
   ;

/**
 * payid
 */
exports.service = function (token, payid, callback) {
	var _clean = {};
	_clean.token = token;
	_clean.payid = payid;
	_clean.reportid = 2; 
	helpers.request(urls.advertiserpaymentsHost, urls.advertiserpaymentsPath, _clean, true, callback);
}