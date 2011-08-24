/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Advertiser Info API
 * 
 * This request gives you the details about the various advertisers in the
 * LinkShare Network. It can be used to create and update a database table for
 * advertisers that can be filtered based on advertiser name, advertiser
 * category, or application status.
 * 
 *  Valid application statuses are:
 *  
 *  approved          - Your application to join this advertiser’s program has been approved.
 *  approval extended - The advertiser has extended a Private Offer to you.
 *  perm rejected     - Your application to join this advertiser’s program has been permanently rejected. You will not be able to reapply.
 *  perm removed      - The advertiser has removed you from their program permanently. You will not be able to reapply.
 *  self removed      - You have removed yourself from this advertiser’s program. You can reapply to it whenever you would like to.
 *  temp removed      - The advertiser has removed you from their program temporarily.You will be able to reapply after 14 days.
 *  temp rejected     - Your application to join this program has been temporarily rejected by the advertiser. You will be able to reapply after 14 days.
 *  wait              - Your application to join this program is pending approval from the advertiser.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 */
exports.service = function (token, parameter, type, callback) {
	type = exports.getRestTypeByAPIType(type);
	var restUrl = urls.advertiserinfoPath + '/' + type + '/' + token + '/' + parameter;
	helpers.request(urls.advertiserinfoHost, restUrl, undefined, false, callback);
}

exports.getRestTypeByAPIType = function (type) {
	if (type == 'mid')
		return 'getMerchByID';
	else if (type == 'name')
		return 'getMerchByName';
	else if (type == 'category')
		return 'getMerchByCategory';
	else if (type == 'status')
		return 'getMerchByAppStatus';
	else
		return type;
}