/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Text Links API
 * 
 * This request gives you the available text links. To specify the links your
 * request returns, you can filter it using these parameters: MID, Category,
 * Start Date, and End Date.
 * 
 * campaignID
 * 		This feature was retired in August 2011.
 * categoryID
 * 		The Creative Category ID for this text link, assigned by the advertiser.
 * 		Use the Creative Category request to obtain it (not the Advertiser
 * 		Category Table listed in the Publisher Help Center).
 * categoryName
 * 		The category name for the product or service promoted by this text link
 * linkID
 * 		The LinkShare-assigned ID for the text link
 * linkName
 * 		The name the advertiser assigns to the link
 * mid
 * 		The LinkShare advertiser ID
 * nid
 * 		The network ID, as shown in this table
 * clickURL
 * 		Click link that contains LinkShare tracking info
 * enddate
 * 		End date for the link, formatted: Mon DD, YYYY (eg, Dec 31, 2009)
 * landURL
 * 		The URL that the text link directs to upon click
 * showURL
 * 		1X1 pixel URL for impression tracking
 * startDate
 * 		Start date for the text link, formatted: Mon DD, YYYY (eg, Dec 31, 2009)
 * textDisplay
 * 		The link’s copy, eg, “15% off now at Advertiser!”
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