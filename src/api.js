/**
 * Linkshare API
 */

var coupon   = require('./coupon')
   ,link     = require('./link')
   ,merchant = require('./merchant')
   ;

function LinkshareAPI (token) {
	this.token = token;
}

/**
 * Coupon Web Service.
 * 
 * http://helpcenter.linkshare.com/publisher/questions.php?questionid=865
 * 
 * Parameters:
 * 
 *  - category       - int
 *  	This variable may contain one or more valid category IDs. These IDs are
 *  	assigned by LinkShare. For a list of category IDs, please click 
 *  	http://helpcenter.linkshare.com/publisher/questions.php?questionid=877
 *  	In addition, a Web Services method for obtaining valid category IDs is
 *  	described below. Category is an optional variable. If you do not submit
 *  	it, your query will search all categories.
 *  
 *  - promotiontype  - int
 *  	This variable may contain one or more valid promotion type IDs. For a 
 *  	list of promotion type IDs, please click
 *  	http://helpcenter.linkshare.com/publisher/questions.php?questionid=876 
 *  	In addition, a Web Services method for obtaining valid promotion type
 *  	IDs is described below. This is an optional variable. If you do not
 *  	submit it, your query will search all promotional types.
 *
 *  - network        - int
 *  	This variable may contain one or more network IDs. This is an optional
 *  	variable. If you do not submit it, your query will search all the
 *  	LinkShare Networks.
 *  
 *  - mid            - int
 *  	This variable may contain one or more Advertiser ID values. To retrieve
 *  	Advertiser MIDs from the Publisher Dashboard, select Links, then click
 *  	Get Links and an advertiser's name, lastly click Advertiser Info at
 *  	left. This is an optional variable. Use it to limit your query to
 *  	specific advertisers. If you do not include it, your query will search
 *  	all advertisers. 
 *  
 *  - resultsperpage - int
 *  	0, or 1-500. 0 to receive the total number of distinct matches that your
 *  	query has returned.
 *  
 *  - pagenumber     - int 
 *  	This variable is optional. Use it to specify the page of results you want. 
 *  	If not submitted, it will return the first page of matches.
 *  
 *  - promocat      - int
 *  	To obtain numbers for categories, promotion types, and network values, 
 *  	send a request with just your Web Services token and 'promocat=1'
 */
LinkshareAPI.prototype.coupon = function (params, callback) {coupon.service(this.token, params, callback)};

/**
 * Link Generator Web Service.
 * 
 * 
 */
LinkshareAPI.prototype.link = function (params, callback) {link.service(this.token, params, callback)};

LinkshareAPI.prototype.merchant = function (params, callback) {merchant.service(this.token, params, callback)};

module.exports = LinkshareAPI;