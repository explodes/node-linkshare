/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Product Links API
 * 
 * This request gives you the various Individual Product links that are 
 * available. To obtain specific individual product links, you can filter it
 * using the following parameters: MID and Category.
 * 
 * RESPONSE:
 * 
 * campaignID
 * 		This feature was retired in August 2011.
 * categoryID
 * 		The Creative Category ID for this link; assigned by the advertiser. Use
 * 		the Creative Category feed to obtain it (not the Advertiser Category
 * 		Table listed in the Publisher Help Center).
 * categoryName
 * 		The category name for the product or service promoted by this Individual
 * 		Product Link
 * linkID
 * 		The LinkShare-assigned ID for the link
 * linkName
 * 		The name the advertiser assigns to the link
 * mid
 * 		The LinkShare advertiser ID
 * nid
 * 		The network ID, as shown in this table.
 * clickURL
 * 		Click link that contains LinkShare tracking info
 * iconURL
 * 		The link to the product image
 * showURL
 * 		1X1 pixel URL for impression tracking
 * 
 * Please note: all the elements in LinkLocator responses include Ôns1:Õ as a prefix.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * category
 * page
 */
exports.service = function (token, parameters, callback) {
	var restPath = exports.getRestPath(token, parameters);
	helpers.request(urls.productlinksHost, restPath, undefined, false, callback);
}

exports.getRestPath = function (token, parameters) {
	return urls.productlinksPath + 
			'/' + token + 
			'/' + (parameters.mid != undefined ? parameters.mid : '-1') +
			'/' + (parameters.category != undefined ? parameters.category : '-1') +
			'/-1' + // campaignID defunct as of August 2011
			'/' + (parameters.page != undefined ? parameters.page : '1');
}