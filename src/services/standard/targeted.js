/**
 * http://cli.linksynergy.com/cli/publisher/links/webServices.php?serviceID=64
 *
 * LinkShare's Targeted Merchandiser API enables custom ad units to be created that automatically populate with products optimized for your site. The optimizing is based on keywords found on your page and on the likelihood of success for an advertiser's products. A REST-based Web services query is used to request a feed. The keyword search will look at the following fields for the product.
 *
 *     Product Name
 *     Primary Category
 *     Short Product Description
 *     Long Product Description
 *     Keyword(s)
 *
 * The query will return a maximum of 15 products.
 *
 *
 * Sample Query URL
 *
 * http://feed.linksynergy.com/target?token=94e973c41fe2c696de23a111b91b6182ae73cf3ee4dddb0eefa0091c266cc5ea&mid=111&height=200&width=100&count=10&url=www.linkshare.com
 *
 *
 *
 * Name-Value Pairs
 *
 *
 * Publisher Token
 *
 * This is the Web services token that is generated on the Web Services page under the Links tab. It is used to authenticate publishers.
 *
 * E.g. [token=94e973c41fe2c696de23a111b91b6182ae73cf3ee4dddb0eefa0091c266cc5ea]
 *
 * Advertiser (MID)
 *
 * This parameter specifies the advertiser (MID) whose products will populate the ad unit. It is found by clicking Advertiser Info on the advertiser's page on the Publisher Dashboard.
 *
 * E.g. [mid=111]
 *
 * Height
 *
 * This parameter allows you to specify the height of a product image in the ad unit. It is an optional value and must be a whole number, 1,000 or lower.
 *
 * E.g. [height=200]
 *
 * Width
 *
 * This allows you to specify the width of a product image in the ad unit. It is an optional value and must be a whole number, 1,000 or lower.
 *
 * E.g. [width=100]
 *
 * Count
 *
 * This is the number of products the query will return. This must be a positive number between 0 and 15.
 *
 * E.g. [count=10]
 *
 * URL
 *
 * This parameter is the URL of your Web page, the content of which is used for contextual product selection. It is an optional value. If your URL is omitted, the referral URL will be used. If the referral URL is not available, then the keywords for your category will be used for selection.
 *
 * E.g. [url=www.linkshare.com]
 *
 *
 *
 * Query Response
 *
 * The results are returned to you in XML. The response to a successful query includes the total matches and the results. The response to a failed query will include the appropriate error message. Errors are discussed below.
 *
 * Here is the XML schema for the response:
 *
 * <?xml version="1.0" encoding="UTF-8"?>
 * <xs:schema
 *     targetNamespace="http://www.linkshare.com/namespaces/targeted-merchandiser-1.0"
 *     elementFormDefault="qualified"
 *     xmlns:xs="http://www.w3.org/2001/XMLSchema"
 *     xmlns:tns="http://www.linkshare.com/namespaces/targeted-merchandiser-1.0">
 *   <xs:annotation>
 *     <xs:documentation>XML Schema for the response returned by the LinkShare Targeted Merchandiser API.</xs:documentation>
 *   </xs:annotation>
 *   <xs:element name="result" type="tns:result"></xs:element>
 *
 *   <xs:complexType name="result">
 *     <xs:choice>
 *       <xs:group ref="tns:ProductResultsGroup"></xs:group>
 *       <xs:element name="Errors" type="tns:ErrorsType" maxOccurs="1" minOccurs="0"></xs:element>
 *     </xs:choice>
 *   </xs:complexType>
 *
 *   <xs:complexType name="ErrorsType">
 *     <xs:sequence>
 *       <xs:element name="ErrorID" type="xs:int">
 *         <xs:annotation>
 *           <xs:documentation>Unique ID for error type</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="ErrorText" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Text describing error</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *     </xs:sequence>
 *   </xs:complexType>
 *
 *   <xs:group name="ProductResultsGroup">
 *     <xs:sequence>
 *       <xs:element name="TotalMatches" type="xs:int" minOccurs="1" maxOccurs="1">
 *         <xs:annotation>
 *           <xs:documentation>The total number of matching products</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="item" type="tns:itemType" minOccurs="0" maxOccurs="15" />
 *     </xs:sequence>
 *   </xs:group>
 *
 *   <xs:complexType name="itemType">
 *     <xs:sequence>
 *       <xs:element name="mid" type="xs:int">
 *         <xs:annotation>
 *           <xs:documentation>Advertiser's unique Merchant ID (MID)</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="merchantname" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Advertiser's Name</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="sku" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Product SKU</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="productname" type="xs:string"></xs:element>
 *       <xs:element name="category" type="tns:categoryType">
 *         <xs:annotation>
 *           <xs:documentation>Product Name</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="price" type="tns:priceType">
 *         <xs:annotation>
 *           <xs:documentation>Retail price for the product</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="upccode" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>UPC for Product</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="description" type="tns:descriptionType">
 *         <xs:annotation>
 *           <xs:documentation>Product description</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="keywords" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Keywords associated with this product by the Advertiser</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="clickurl" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>LinkShare Click URL for this product</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="adurl" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>
 *             URL for the product image, proportionally-scaled scaled fit within the specfied width
 *             and height. The unscaled, origninal image URL if size not specified.
 *           </xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="impressionurl" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>
 *             LinkShare ad 1X1 pixel image URL to track the impressions for this product
 *           </xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *     </xs:sequence>
 *   </xs:complexType>
 *
 *   <xs:complexType name="categoryType">
 *     <xs:sequence>
 *       <xs:element name="primary" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Advertiser-defined primary category</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="secondary" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Advertiser-defined secondary category</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *     </xs:sequence>
 *   </xs:complexType>
 *
 *   <xs:complexType name="priceType">
 *     <xs:simpleContent>
 *       <xs:extension base="xs:string">
 *         <xs:attribute name="currency" type="xs:string">
 *           <xs:annotation>
 *             <xs:documentation>
 *               Currency code for the currency type of the price (e.g. "USD" for US Dollar)
 *             </xs:documentation>
 *           </xs:annotation>
 *         </xs:attribute>
 *       </xs:extension>
 *     </xs:simpleContent>
 *   </xs:complexType>
 *
 *   <xs:complexType name="descriptionType">
 *     <xs:sequence>
 *       <xs:element name="short" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Short product description</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *       <xs:element name="long" type="xs:string">
 *         <xs:annotation>
 *           <xs:documentation>Long product description</xs:documentation>
 *         </xs:annotation>
 *       </xs:element>
 *     </xs:sequence>
 *   </xs:complexType>
 * </xs:schema>
 *
 *
 * Here is a sample response:
 *
 * <source lang="xml">
 *     <?xml version="1.0"?>
 *     <result>
 *         <TotalMatches>25</TotalMatches>
 *         <item>
 *             <mid>1145</mid>
 *             <merchantname>J&R Computer/Music World</merchantname>
 *             <sku>BKN F8V308-12</sku>
 *             <productname>Belkin F8V308 12-Foot PRO Gold Series S-Video Cable</productname>
 *             <category>
 *                 <primary>Video &amp; TV</primary>
 *                 <secondary>Video - TV ~~ Accessories ~~ Cables and Connectors</secondary>
 *             </category>
 *             <price currency="USD">6.99</price>
 *             <upccode>722868335253</upccode>
 *             <description>
 *                 <short>
 *                     A top shelf 12 foot shielded S-Video cable with gold-plated terminator pins /
 *                     Perfect for high resolution image technologies
 *                 </short>
 *                 <long>
 *                     Hundreds of Munchkins can't be wrong, at least not when they're urging
 *                     travellers to "Follow the yellow brick road" Gold delivers the signal cleanly
 *                     and truly every time With this 12-foot Belkin PRO Gold Series Cable, you can
 *                     connect camcorders, satellite dish receivers, DVD players or any video source
 *                     with S-video (4-pin mini DIN)
 *                 </long>
 *             </description>
 *             <keywords>Video - TV ~~ Accessories ~~ Cables and Connectors ~~ Cables</keywords>
 *             <clickurl>
 *                 http://click.linksynergy.com/fs-bin/click?id=KgGHO0LswUU&offerid=101744.1141877&type=23
 *             </clickurl>
 *             <adurl>
 *                 http://m.adscale.linksynergy.com/product/120x120/1145/1141877
 *             </adurl>
 *             <impressionurl>
 *                 http://ad.linksynergy.com/show?id=101744.1141877&amp;type=23
 *             </impressionurl>
 *         </item>
 *     </result>
 * </source>
 *
 *
 * Note: Indentation was added here for readability; the actual XML response will not be indented.
 *
 *
 *
 * Errors
 *
 *
 * This element gives you the details of any errors returned. It will exist only if there are one or more errors. This table includes the error messages that can be returned.
 *
 * Message
 * 	
 *
 * Possible Updates
 *
 * The link provided is formatted incorrectly.
 * 	
 *
 * Please check the link format against the sample in this document, and try again.
 *
 * No token ID was provided.
 * 	
 *
 * Include token ID and resubmit query.
 *
 * The token ID is invalid.
 * 	
 *
 * Please check token ID.
 *
 * The publisher is not joined to this advertiser.
 * 	
 *
 * Try an advertiser you have a relationship with.
 *
 * No advertiser exists with this MID.
 * 	
 *
 * Make sure that the advertiser MID is correct.
 *
 * No advertiser ID was provided.
 * 	
 *
 * Please include advertiser ID in query and resubmit.
 *
 * Targeted Merchandiser API is not enabled for this advertiser.
 * 	
 *
 * Try an advertiser enabled for this API.
 *
 * You are not enabled to use Targeted Merchandiser API for this advertiser.
 * 	
 *
 * Select another advertiser and resubmit query.
 *
 * LinkShare system error 85439.
 * 	
 *
 * LinkShare system error. Please try again.
 *
 * You can only request the top 15 product matches.
 * 	
 *
 * Make sure count parameter is 15 or less.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * mid
 * height
 * width
 * count
 * url
 */
exports.service = function (token, params, callback) {
	var _clean = helpers.clean(params);
	_clean.token = token;
	helpers.request(urls.targetedHost, urls.targetedPath, _clean, false, callback);
}