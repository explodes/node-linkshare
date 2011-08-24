/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * DRM Links API
 * 
 * This feed gives you the available DRM links. To obtain specific DRM links,
 * you can filter it using these parameters: MID, Category, Start Date, and
 * End Date.
 * 
 * RESPONSE:
 * 
 * campaignID
 * 		This feature was retired in August 2011.
 * categoryID
 * 		The Creative Category ID for this DRM; assigned by the advertiser. Use the Creative Category feed to obtain it (not the Advertiser Category Table listed in the Publisher Help Center).
 * categoryName
 * 		The category name for the product or service promoted by this DRM link
 * linkID
 * 		The LinkShare-assigned ID for the link
 * linkName
 * 		The name the advertiser assigns to the link
 * mid
 * 		The LinkShare advertiser ID
 * nid
 * 		The network ID, as drawn from this table
 * code
 * 		The URL that directs to the JavaScript for the DRM
 * endDate
 * 		End date for the DRM link, formatted: Mon DD, YYYY (eg, Dec 31, 2009)
 * height
 * 		Height of DRM in pixels
 * servertype
 * 		The banner host, either 4 (LinkShare) or 22 (advertiser)
 * showURL
 * 		1X1 pixel URL for impression tracking
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
	helpers.request(urls.drmlinksHost, restPath, undefined, false, callback);
}

exports.getRestPath = function (token, parameters) {
	return urls.drmlinksPath + 
			'/' + token + 
			'/' + (parameters.mid != undefined ? parameters.mid : '-1') +
			'/' + (parameters.category != undefined ? parameters.category : '-1') +
			'/' + (parameters.start != undefined ? helpers.toMMDDYYYY(parameters.start) : '') +
			'/' + (parameters.end != undefined ? helpers.toMMDDYYYY(parameters.end) : '') +
			'/-1' + // campaignID defunct as of August 2011
			'/' + (parameters.page != undefined ? parameters.page : '1');
}