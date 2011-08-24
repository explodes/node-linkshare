/**
 * Using the Coupon Web Service
 * The LinkShare Coupon Web Service gives you easy access to coupon and promotional link data for your advertisers. All of the links are reviewed by LinkShare to ensure that they are indeed coupon or consumer promotional links. To receive this creative, you simply place a REST-based Web Services call with your feed token. (For a PDF of these guidelines and an XML schema, please click here: , or see the attachment at the end of the article.)
 * 
 * Submitting a Coupon Web Service Request
 * A REST-based Web Service lets you request a feed using a query structured like an HTML GET. The inputs to the query are your Web Services token, the product category, the promotion type, the network, an advertiser ID (MID), the number of results per page, and the page number. Your Web Services token is required; the other values are optional.
 * 
 * Here is a sample request that excludes MID:
 * 
 * http://couponfeed.linksynergy.com/coupon?token=94e973c41fe2c696de23a111b91b6182ae73cf3ee4dddb0eefa0091c266cc5ea&
 * category=4169&promotiontype=21&network=1&resultsperpage=100&pagenumber=2
 * 
 * This query will send coupon and promotional link data for up to one hundred advertisers that you are partnered with in network 1 who have products in category 4169 that correspond with offer-promotion type 21.
 * 
 * Name-Value Pairs
 * 
 * Publisher Token:[token=94e973c41fe2c696de23a111b91b6182ae73cf3ee4dddb0eefa0091c266cc5ea]
 * This is the Web Services token that is generated on the Web Services page of the Publisher Dashboard under the Links tab. It is used to authenticate publishers and must be submitted with your query.
 * 
 * Category: [category=4169]
 * This variable may contain one or more valid category IDs. These IDs are assigned by LinkShare. For a list of category IDs, please click here. In addition, a Web Services method for obtaining valid category IDs is described below. Category is an optional variable. If you do not submit it, your query will search all categories.
 * 
 * Promotion Type: [promotiontype=21]
 * This variable may contain one or more valid promotion type IDs. For a list of promotion type IDs, please click here. In addition, a Web Services method for obtaining valid promotion type IDs is described below. This is an optional variable. If you do not submit it, your query will search all promotional types.
 * 
 * Network: [network=1]
 * This variable may contain one or more network IDs. This is an optional variable. If you do not submit it, your query will search all the LinkShare Networks.
 * 
 *  Network 	 Network ID
 *  US 	 1
 *  UK 	 3
 *  CAN 	 5
 * 
 * MID: [mid=36518]
 * This variable may contain one or more Advertiser ID values. To retrieve Advertiser MIDs from the Publisher Dashboard, select Links, then click Get Links and an advertiser's name, lastly click Advertiser Info at left. This is an optional variable. Use it to limit your query to specific advertisers. If you do not include it, your query will search all advertisers.
 * 
 * Results per Page: [resultsperpage=100]
 * This variable is optional. Use it to specify the number of results per page. The variable must be a number between 1 and 500. You can also submit resultsperpage=0 to receive the total number of distinct matches that your query has returned.
 * 
 * Page Number: [pagenumber=2]
 * This variable is optional. Use it to specify the page of results you want. If not submitted, it will return the first page of matches.
 * 
 */

var helpers = require('./helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * category
 * promotiontype
 * resultsperpage
 * pagenumber
 * network
 */
exports.service = function (token, params, callback) {
	var _clean = helpers.clean(params);
	_clean.token = token;
	helpers.request(urls.couponHost, urls.couponPath, _clean, false, callback);
}