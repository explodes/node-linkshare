/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=MTExOXxVc2luZyBXZWIgU2VydmljZXMgZm9yIFBheW1lbnQgUmVwb3J0cy5wZGY%3D
 * 
 * Payment Details Report API
 * 
 * This report provides the advertiser name, product name, SKU, commission, and
 * other transaction level details for a particular invoice or for all the
 * invoices from a particular payment ID.
 *
 * SAMPLE RESPONSE: (either with payid or invoiceid)
 * 
 * "Date," "Time," "Advertiser ID," "Advertiser," "Order ID," "SKU #," "Product Name," "Items," "Sales," "Baseline Commission," "Adjusted Commission," "Actual Commission," "Reason," "Advertiser Payment Memo," "Advertiser Payment Date"
 * "2/2/2011," "18:36:00," "34573," "Auto Parts Warehouse," "8323087," "WRE133-17323," "Antenna," "1," "14.42," "5.5179," "0," "4.5179," "UNKNOWN," "N/A," "4/25/2011"
 */

var helpers = require('../helpers')
   ,urls    = require('../urls')
   ;

/**
 * invoiceid
 * payid
 */
exports.service = function (token, id, isInvoiceId, callback) {
	var _clean = {};
	_clean.token = token;
	if (isInvoiceId)
		_clean.invoiceid = id;
	else
		_clean.payid = id;
	_clean.reportid = 3;
	helpers.request(urls.paymentdetailHost, urls.paymentdetailPath, _clean, true, callback);
}