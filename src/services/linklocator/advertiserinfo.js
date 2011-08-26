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
 *  
 *  RESPONSE:
 *  
 *  <ns1:getMerchByIDResponse>
 *  	<ns1:return>
 *  		<ns1:applicationStatus>Approved</ns1:applicationStatus>
 *  		<ns1:categories>5 114 123 117 122 8 6 113 </ns1:categories>
 *  		<ns1:mid>2385</ns1:mid>
 *  		<ns1:name>LinkShare Demo Master</ns1:name>
 *  		<ns1:offer>
 *  			<ns1:alsoName>628.4</ns1:alsoName>
 *  			<ns1:commissionTerms>sale : 0-null .2%</ns1:commissionTerms>
 *  			<ns1:offerId>134869</ns1:offerId>
 *  			<ns1:offerName>071004 KT Test</ns1:offerName>
 *  		</ns1:offer>
 *  	</ns1:return>
 *  </ns1:getMerchByIDResponse>
 *  
 *  applicationStatus
 *  	The status of your application to this advertiser’s program. Please click here for a description of each status.
 *  	string
 *  categories
 *  	The advertiser’s categories, drawn from this table, and space delimited.
 *  	string
 *  mid
 *  	The advertiser’s LinkShare ID number.
 *  	numeric
 *  name
 *  	The name of the advertiser.
 *  	string
 *  alsoName
 *  	An alternate name for the advertiser, often an abbreviated version.
 *  	string
 *  commissionTerms
 *  	The commission terms of the advertiser’s offer that you are participating in. The terms of tiered offers are pipe delimited. Here’s an example:
 *  	<ns1:commissionTerms>sale : 0-10 0% | 10-20 1% | 20-30 2% </ns1:commissionTerms>
 *  	string
 *  offerId
 *  	The ID number of the advertiser’s offer you are participating in.
 *  	numeric
 *  offerName
 *  	The name of the advertiser’s offer you are participating in.
 *  	string
 *  
 *  Please note: all the elements in LinkLocator responses include ‘ns1:’ as a prefix.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * parameter
 * type
 */
exports.service = function (token, parameter, type, callback) {
	type = exports.getRestTypeByAPIType(type);
	var restUrl = urls.advertiserinfoPath + '/' + type + '/' + token + '/' + parameter.toString().replace(new RegExp(' ', 'g'), '%20');
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