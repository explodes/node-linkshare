/**
 * Linkshare API
 */

var services = require('./services/all')
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
LinkshareAPI.prototype.coupon = function (params, callback) {services.coupon(this.token, params, callback)};

/**
 * Link Generator Web Service.
 * 
 * http://cli.linksynergy.com/cli/publisher/links/webServices.php?serviceID=43
 * 
 * Parameters:
 * 
 * 	- mid  - int
 * 		The MID is a unique identifier for the merchant. It can be obtained from
 * 		the Web Services--Merchant Links Feed.
 * 
 * 	- murl - string
 * 		The URL is the landing page on the merchant's site. Special characters
 * 		do not need to be encoded.
 */
LinkshareAPI.prototype.link = function (mid, murl, callback) {services.link(this.token, mid, murl, callback)};

/**
 * Mechant Query API
 * 
 * http://cli.linksynergy.com/cli/publisher/links/webServices.php?serviceID=1
 * 
 * Parameters:
 * 
 * 	- keyword  - string
 * 		This parameter will provide the keyword for the search. Keywords can be
 * 		one or more words long.
 * 
 * 	- category - string
 * 		This optional parameter will provide the product category to restrict
 * 		the search. You will need to provide the category name.
 * 
 * 	- results  - int
 * 		This optional parameter will allow you to specify the maximum number of
 * 		results returned in one page. The default will be 20. You have the
 * 		option to enter a value from 0 through 100. Maximum Results set to 0:
 * 		This special case will return the total number of results found but not
 * 		show any of the results.
 * 
 * 	- page     - int
 * 		This optional parameter will allow you to specify the page number for
 * 		the results returned. If you provide a page number beyond the total
 * 		number of pages for the results, an error will be returned. The default
 * 		will be 1.
 * 
 * 	- mid      - int
 * 		This optional parameter will allow you to specify a merchant (MID) and
 * 		the search will be limited to that merchant’s products. If you do NOT
 * 		specify an MID, the Search will be done for all Merchants that you are
 * 		partnered with.
 * 
 * 	- sort     - Array
 * 	- sorttype - Array
 * 		These array specify a list of fields to sort by, and the sort order,
 * 		respectively. Example:
 * 			sort: ['retailprice', 'productname']
 * 			sorttype: ['asc', 'desc']
 * 		This would sort primarily by retailprice, ascending, then by
 * 		productname, descending.
 *		Allowed values for sort are:
 *			retailprice
 *			productname
 *			categoryname
 *			mid
 */
LinkshareAPI.prototype.merchant = function (params, callback) {services.merchant(this.token, params, callback)};

/**
 * Targeted Merchandiser API
 * 
 * http://cli.linksynergy.com/cli/publisher/links/webServices.php?serviceID=64
 * 
 * Parameters:
 * 
 * 	- mid    - int
 * 		This parameter specifies the advertiser (MID) whose products will
 * 		populate the ad unit. It is found by clicking Advertiser Info on the
 * 		advertiser's page on the Publisher Dashboard. 
 * 
 * 	- height - int
 * 		This parameter allows you to specify the height of a product image in
 * 		the ad unit. It is an optional value and must be a whole number, 1,000
 * 		or lower. 
 * 
 * 	- width  - int
 * 		This allows you to specify the width of a product image in the ad unit.
 * 		It is an optional value and must be a whole number, 1,000 or lower. 
 * 
 * 	 - count - int
 * 		This is the number of products the query will return. This must be a
 * 		positive number between 0 and 15. 
 * 
 * 	- url    - string
 * 		This parameter is the URL of your Web page, the content of which is used
 * 		for contextual product selection. It is an optional value. If your URL
 * 		is omitted, the referral URL will be used. If the referral URL is not
 * 		available, then the keywords for your category will be used for
 * 		selection.
 */
LinkshareAPI.prototype.targeted = function (params, callback) {services.targeted(this.token, params, callback)};

module.exports = LinkshareAPI;