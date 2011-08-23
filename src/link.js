/**
 * The Automated LinkGenerator is a Web Service to create LinkShare click links for any product on a merchant's site.It provides the same functionality as the LinkGenerator feature in the Individual Product Links interface, without having to login to the affiliate interface.
 *
 * To create an Automated LinkGenerator link, an affiliate sends a URL from the merchant's site to LinkShare in the format specified below. The URL can be sent through a browser, a tool like wget or curl, or an automated script. For each URL provided, LinkShare returns a click link. An affiliate can request up to 1,000 links within an hour.
 *
 * URLs are sent to LinkShare in this format (with the token, mid, and murl parameters in this order):
 * http://feed.linksynergy.com/createcustomlink.shtml?token=<token-ID>&mid=<MID>&murl=<URL-from-merchant>
 *
 *     The token ID can be found in the affiliate interface on the RSS Resource Page.
 *     The MID is a unique identifier for the merchant. It can be obtained from the Web Services--Merchant Links Feed.
 *     The URL is the landing page on the merchant's site. Special characters do not need to be encoded.
 *
 * A URL with these fields populated might look like:
 * http://feed.linksynergy.com/createcustomlink.shtml?token=813cc9fbb4ecc65eb3356d7637c015c38358d4c01a
 * 3f48876d62ff7409bed1&mid=560&murl=http://www.merchant.com/productpage?prodid=1224231&buylink=yes
 *
 * LinkShare will return a click link in the form:
 * http://click.linksynergy.com/fs-bin/click?id=AAA111AAA11&subid=0&offerid=999999.1&type=10&tmpid=939
 * &RD_PARM1=http%3A%2F%2Fwww.merchantname.com%2Fsearch%2Fdetail.cfm%3Fchunk%3D25%2526mtype%3D%2526wauth
 * %3Da%2520name%2526qwork%3D2875272%2526S%3DR%2526bid%3D8713366401%2526pbest%3D2%252E95%2526pqtynew%3D0
 * %2526page%3D1%2526matches%3D24%2526qsort
 *
 * The system will give errors for the following situations:
 *
 *     The link is provided in an invalid format that LinkShare cannot parse.
 *     The link does not include a token ID.
 *     The link includes an invalid token ID, for example if the affiliate no longer has Automated LinkGenerator enabled.
 *     The affiliate is not joined to the merchant MID included in the link.
 *     The merchant MID included in the link is invalid.
 *     The link does not include a merchant MID.
 *     The merchant does not have LinkGenerator enabled for affiliates.
 *     The link does not include a merchant URL.
 *     The affiliate has exceeded its hourly limit for using the Automated LinkGenerator tool.
 *
 * Once LinkShare has returned a click link, it can easily be placed on your affiliate site.
 * The format for a text link will be:
 * <a href="[CLICK_URL]" >[LINK_TEXT]</a><IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[AFFILIATE_ID]&bids=[OFFER_ID]&type=2&subid=0" >
 *
 *     Paste the exact return value from the Automated LinkGenerator tool in place of [CLICK_URL].
 *     Provide link text for the user in place of [LINK_TEXT].
 *     The [AFFILIATE_ID] can be found in the returned URL from the Automated LinkGenerator tool. It will appear just after ?id= in the click link just as it will be pasted here. In the example above, the [AFFILIATE_ID] value, AAA111AAA11, would be found as ?id=AAA111AAA11. Paste this value in place of [AFFILIATE_ID].
 *     The [OFFER_ID] can also be found in the returned URL from the Automated LinkGenerator tool. It will appear between &offerid= and .1. In the example above, the [OFFER_ID] value, 999999, would be found as &offerid=999999.1. Paste this value in place of [OFFER_ID].
 *
 * The format for a banner link will be:
 * <a href="[CLICK_URL]" ><IMG border="0" src="[IMAGE_URL]" ></a><IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[AFFILIATE_ID]&bids=[OFFER_ID]&type=2&subid=0" >
 *
 *     Paste the exact return value from the Automated LinkGenerator tool in place of [CLICK_URL].
 *     Paste the URL of the image on the merchant's site in place of [IMAGE_URL].
 *     The [AFFILIATE_ID] can be found in the returned URL from the Automated LinkGenerator tool. It will appear just after ?id= in the click link just as it will be pasted here. In the example above, the [AFFILIATE_ID] value, AAA111AAA11, would be found as ?id=AAA111AAA11. Paste this value in place of [AFFILIATE_ID].
 *     The [OFFER_ID] can also be found in the returned URL from the Automated LinkGenerator tool. It will appear between &offerid= and .1. In the example above, the [OFFER_ID] value, 999999, would be found as &offerid=999999.1. Paste this value in place of [OFFER_ID].
 */

var helpers = require('./helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * murl
 */
exports.service = function (token, params, callback) {
	 var _clean = helpers.clean(params);
	 _clean.token = token;
	 helpers.request(urls.linkHost, urls.linkPath, params, callback);
}