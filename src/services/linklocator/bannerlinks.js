/**
 * http://helpcenter.linkshare.com/publisher/getattachment.php?data=NTh8TGlua0xvY2F0b3IgRGlyZWN0IElJXyBSRVNUXzQuMS5wZGY%3D
 * 
 * Banner Links API
 * 
 * This feed gives you the available banner links. To obtain specific banner links, you can filter this request using these parameters: MID, Category, Size, Start Date, and End Date.
 * 
 * Valid sizes:
 * 
 * Size code	Width	Height	Name
 * 1			468		60		Full Banner
 * 2			392		72		Mid Banner
 * 9			160		600		Wd Skyscrp
 * 10			120		600		Skyscraper
 * 11			180		150		Rectangle
 * 12			336		280		Large Rect
 * 3			234		60		Half Banner
 * 13			300		250		Med Rect
 * 14			250		250		Sq Pop-up
 * 15			240		400		Vert Rect
 * 4			125		125		Sq Button
 * 5			120		90		Button 1
 * 6			120		60		Button 2
 * 7			88		31		Micro Bar
 * 8			120		240		Vert Banner
 * 0			0		0		Other
 * 16			728		90		Leader-board
 * 17			720		300		Pop-Under
 * 18			550		480		Pop-Up Large
 * 19			300		600		Half Page Ad
 * 20			305		64		X-Large
 * 21			215		64		Large
 * 22			167		30		Medium
 * 23			112		20		Small
 * 24			0		0		Other
 * 
 * RESPONSE:
 * 
 *	<ns1:return>
 *		<ns1:campaignID>0</ns1:campaignID>
 * 		<ns1:categoryID>28</ns1:categoryID>
 * 		<ns1:categoryName>Summer Sale</ns1:categoryName>
 * 		<ns1:linkID>10000001</ns1:linkID>
 * 		<ns1:linkName>father's day 1_120x60</ns1:linkName>
 * 		<ns1:mid>2254</ns1:mid>
 * 		<ns1:nid>1</ns1:nid>
 * 		<ns1:clickURL> http://click.linksynergy.com/fs-bin/click?id=lMh2Xiq9xN0&offerid=192792.10000001&type=4 </ns1:clickURL>
 * 		<ns1:endDate>Jun 22, 2013</ns1:endDate>
 * 		<ns1:height>60</ns1:height>
 * 		<ns1:iconURL> http://merchant.linksynergy.com/fs/banners/2254/2254_10000001.jpg </ns1:iconURL>
 * 		<ns1:imgURL> http://ad.linksynergy.com/fs-bin/show?id=lMh2Xiq9xN0&bids=192792.10000001&type=4 </ns1:imgURL>
 * 		<ns1:serverType>4</ns1:serverType>
 * 		<ns1:size>6</ns1:size>
 * 		<ns1:startDate>Jun 19, 2011</ns1:startDate>
 * 		<ns1:width>120</ns1:width>
 *	</ns1:return>
 *
 * campaignID
 * 		This feature was retired in August 2011
 * categoryID
 * 		The Creative Category ID for this banner; assigned by the advertiser. Use the Creative Category feed to obtain it (not the Advertiser Category Table listed in the Publisher Help Center).
 * categoryName
 * 		The category name for the product or service promoted by this banner
 * linkID
 * 		The LinkShare-assigned ID for the banner link
 * linkName
 * 		The name the advertiser assigns to the link
 * mid
 * 		The LinkShare advertiser ID
 * nid
 * 		The network ID, drawn from this table
 * clickURL
 * 		Click link that contains LinkShare tracking info
 * endDate
 * 		End date for the banner, formatted: Mon DD, YYYY (eg, Dec 31, 2009)
 * height
 * 		Height of banner in pixels
 * iconURL
 * 		The same as imgURL (below)
 * imgURL
 * 		The URL of the banner itself
 * landURL
 * 		The URL that the banner directs to upon click
 * servertype
 * 		The banner host, either 4 (LinkShare) or 22 (advertiser)
 * showURL
 * 		1X1 pixel URL for impression tracking
 * size
 * 		The banner size code as drawn from this table
 * startDate
 * 		Start date for the banner, formatted: Mon DD, YYYY (eg, Dec 31, 2009)
 * width
 * 		Width of banner in pixels
 * 
 * Please note: all the elements in LinkLocator responses include Ôns1:Õ as a prefix.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * category
 * start
 * end
 * size
 * page
 */
exports.service = function (token, parameters, callback) {
	var restPath = exports.getRestPath(token, parameters);
	helpers.request(urls.bannerlinksHost, restPath, undefined, false, callback);
}

exports.getRestPath = function (token, parameters) {
	return urls.bannerlinksPath + 
			'/' + token + 
			'/' + (parameters.mid != undefined ? parameters.mid : '-1') +
			'/' + (parameters.category != undefined ? parameters.category : '-1') +
			'/' + (parameters.start != undefined ? helpers.toMMDDYYYY(parameters.start) : '') +
			'/' + (parameters.end != undefined ? helpers.toMMDDYYYY(parameters.end) : '') +
			'/' + (parameters.size != undefined ? parameters.size : '-1') +
			'/-1' + // campaignID defunct as of August 2011
			'/' + (parameters.page != undefined ? parameters.page : '1');
}