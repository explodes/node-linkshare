/** 
 *
 * http://cli.linksynergy.com/cli/publisher/links/webServices.php?serviceID=1
 *
 * Merchandiser Query API
 *
 * With the Merchandiser Query API, you can run a query against the Merchandiser data for Advertisers that you are partnered with. The full text search will return all products that match the keyword in any of the following fields
 *
 *     Product Name
 *     Primary Category
 *     Short Product Description
 *     Long Product Description
 *     Keyword(s)
 *
 * The query will return a maximum of 4000 search results.
 *
 * Sample Query URL
 * http://feed.linksynergy.com/productsearch?token=2q34asdr35shgrtyw42473457dsfgsdw324d32&keyword="DVD Player"&cat="Electronics"&MaxResults=20&pagenumber=1&mid=2557&sort=retailprice&sorttype=asc&sort=productname&sorttype=asc
 *
 * Affiliate Token
 * In order to authenticate affiliates we will use the Feed Synergy Token that can be generated on the Feed Synergy page.
 *
 * Keyword
 * This parameter will provide the keyword for the search. Keywords can be one or more words long.
 *
 * Category
 * This optional parameter will provide the product category to restrict the search. You will need to provide the category name.
 *
 * Maximum Results
 * This optional parameter will allow you to specify the maximum number of results returned in one page. The default will be 20. You have the option to enter a value from 0 through 100.
 * Maximum Results set to 0: This special case will return the total number of results found but not show any of the results.
 *
 * Page Number
 * This optional parameter will allow you to specify the page number for the results returned. If you provide a page number beyond the total number of pages for the results, an error will be returned. The default will be 1.
 *
 * Merchant
 * This optional parameter will allow you to specify a merchant (MID) and the search will be limited to that merchant’s products. If you do NOT specify an MID, the Search will be done for all Merchants that you are partnered with.
 *
 * Query Response
 * The results will be returned to the Affiliate using an XML format. The response will include the following elements: errors, total matches, total pages, page number and results.
 *
 * Result Sorting
 * The results of the search can be sorted in ascending or descending order for the fields listed below.
 *
 * Field Name	Sort Field Value
 * Price	retailprice
 * Product Name	productname
 * Primary Category	categoryname
 * Merchant ID	mid
 *
 *
 * Sample Response
 * <result> <TotalMatches>46</TotalMatches> <TotalPages>1</TotalPages> <PageNumber>1</PageNumber> <item> <mid>2557</mid> <merchantname>DVD Players</merchantname> <linkid>1000012</linkid> <createdon>2006-09-30/20:04:17</createdon> <sku> JR-E-12324</sku> <productname>Sony Blu-Ray DVD Player</productname> <category> <primary>Electronics</primary> <secondary>TV . Video</secondary> </category> <price currency="JPY">59704</price> <upccode>4901340995017</upccode> <description> <short>Awesome Pictures with a Sony-Blu-Ray DVD player.</short> <long>Watch all your HD-DVDs with great picture quality and exciting new features.</long> </description> <keywords>DVD Player~~BluRay~~SONY</keywords> <linkurl>http://click.linksynergy.com/fs-bin/click?id=wYeATVOgEnE&amp;offerid=80126.2&amp;type=15&amp;subid=0&amp;lsnurltype=1</linkurl> <imageurl>http://www.lsjapan-store.jp/img/product/health01.gif</imgurl> </item> </result>
 * Errors
 * This element gives you the details of any errors returned. This optional element will only exist if there are one or more errors.
 *
 * Error Details
 * The following error messages may be returned:
 *
 * Error Text
 * Internal error 18171653 occurred.
 * No token specified.
 * Internal error 26255147 occurred.
 * Invalid token specified.
 * The Keyword used is invalid. Please use an alternative keyword.
 * No keyword specified.
 * Invalid characters in keyword. Invalid characters are as follows: & = ? {} \ () [] - ; ~ | $ ! > < * %
 * MID must be numeric
 * Internal error 88726633 occurred.
 * Invalid MID specified.
 * Internal error 47222635 occurred.
 *
 * Total Matches
 * This required element gives the total number of results found a given search. If there is an error, then this element will have a value of 0.
 * NOTE: The search system will only return a maximum of 4000 records. For searches that result in more than 4000 result, the total matches will be set -1, which will indicate that some records that matched the search were not returned.
 *
 * Total Pages
 * This required element gives the total number of pages for this search result. The number of pages is defined by the formula Total Matches/Results Per Page. This is a required element. If there is an error, then this element will have a value of 0.
 *
 * Page Number
 * This required element gives the current page number. If there is an error, then this element will have a value of 0.
 *
 * Items
 * The Items element will include the following fields of information.
 *
 * Merchandiser Field 	Description 	Example
 * Merchant Id 	LinkShare ID for Merchant 	2557
 * Merchant Name 	The name of the Merchant that is selling this product. 	DVD Players
 * LinkID 	The internal LinkShare ID for the particular product link. 	1000012
 * Created on 	The date when the product link is created. 	10/24/2007
 * SKU 	The Merchant specified SKU number for the product. 	JR-E-1234
 * Product Name 	The name of the item. 	Sony Blu-Ray DVD Player
 * Product Category - Primary 	The Primary Category for the product. 	Electronics
 * Product Category - Secondary 	The Secondary Category for the product. 	TV . Video
 * Retail Price 	The retail price of the product. The currency will also be included. 	$55.95
 * UPC Code 	The UPC Code for the product. 	4901828458392023
 * Product Description - Short 	The short description of the product. 	Awesome Pictures with a Sony-Blu-Ray DVD player.
 * Product Description - Long 	The long description of the product. 	Watch all your HD-DVDs with great picture quality and exciting new features.
 * Product Keywords 	The keywords that are attributed to the product. 	DVD Player~~BluRay~~SONY
 * Product Buy Link 	The link that the user can click to be taken to the Merchants page where they can buy the product listed. 	http://click.linksynergy.com/fs-bin/click?id=XXX
 * Product Image Link 	The link that points to an image of the product. This URL will be on the merchants site. 	http://click.linksynergy.com/fs-bin/click?id=XXX
 */

var qs = require('querystring')
   ;

var helpers = require('./helpers')
   ,urls    = require('./urls')
   ;

/**
 * keyword
 * category
 * results
 * page
 * mid
 * sort array
 * sorttype array
 */
exports.service = function (token, params, callback) {
	var _clean = helpers.clean(params);
	var url = exports.makeUrl (token, _clean);
	helpers.request(urls.merchantHost, url, undefined, false, callback);
}

exports.makeUrl = function (token, params) {
	var query = '?token=' + token;
	
	if (params.keyword) {
		query += '&';
		query += 'keyword="' + qs.escape(params.keyword) + '"';
	}
	
	if (params.category) {
		query += '&';
		query += 'cat="' + qs.escape(params.category) + '"';
	}
		
	if (params.results) {
		query += '&';
		query += 'MaxResults=' + params.results;
	}
		
	if (params.page) {
		query += '&';
		query += 'pagenumber=' + params.page;
	}
		
	if (params.mid) {
		query += '&';
		query += 'mid=' + params.mid;
	}
		
	if (Array.isArray(params.sort))
		for (var index = 0; index < params.sort.length; index++) {
			query += '&';
			var sorttype = Array.isArray(params.sorttype) && params.sorttype.length > index ? params.sorttype[index] : 'asc';
			query += 'sort=' + params.sort[index] + '&sorttype=' + sorttype;
		}
	
	return urls.merchantPath + query;
}