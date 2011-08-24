/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Creative Categories API
 * 
 * This provides you with the list of categories that advertisers place their
 * creative into. Each advertiser has their own set of categories. You can use
 * this information to filter the creative feeds to obtain links from one of
 * these categories.
 * 
 * RESPONSE:
 * 
 * catId
 * 	The Creative Category ID that is assigned by the advertiser.
 * 	numeric
 * catName
 * 	The category name the advertiser.
 * 	string
 * mid
 * 	This is the LinkShare advertiser ID.
 * 	numeric
 * nid
 * 	The Network ID, as shown in this table
 * 	numeric
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 */
exports.service = function (token, mid, callback) {
	var restPath = exports.getRestPath(token, mid);
	helpers.request(urls.creativecategoriesHost, restPath, undefined, false, callback);
}

exports.getRestPath = function (token, mid) {
	return urls.creativecategoriesPath + '/' + token + '/' + mid;
}