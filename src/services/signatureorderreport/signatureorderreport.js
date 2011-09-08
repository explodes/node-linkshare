/**
 * Signature Orders Report Web Service
 * To make the process of getting the Signature Orders Report more efficient, we offer a feature that allows publishers to download it directly. This enables publishers who use Signature to get reporting data for a specified time period without logging in to the Publisher Dashboard. Publishers can also automate the process of retrieving transaction and associated member ID information on a daily basis. The direct download feature is a flexible way for you to generate the Signature Orders Report how and when you want to.
 *
 * How the Feature Works
 *
 * The Signature Orders Report can be downloaded using the URL syntax displayed below. Please note that you must specify certain parameters in order to access your report for the desired period.
 *
 * URL Syntax:   
 *
 * http://cli.linksynergy.com/cli/publisher/reports/downloadReport.php?bdate=YYYYMMDD&edate=YYYYMMDD&cuserid=username&cpi=password&eid=sitecode&nid=networkid
 *
 * You must supply the information for these fields:
 *
 * bdate- The begin date for the report you would like to generate, in YYYYMMDD format, based on process date (the date a transaction is processed through the LinkShare system).
 *
 * edate - The end date for the report you would like to generate, in YYYYMMDD format, based on process date.
 *
 * cuserid - The user name that you use to access your publisher channel.
 *
 * cpi - The password that you use to access your publisher channel.
 *
 * eid - This is the LinkShare-assigned ID for your publisher channel; if you only have one channel you do not need to supply a value for this field. Your eid (also called affiliate ID) is the unique 11-character code that tells LinkShare which publisher a click came from. It appears in blue in this example and can be found in any of your links: <a href="http://click.linksynergy.com/fs-bin/click?id=lmf2Xiq9yN9&offerid=176538.10016078&type=3&subid=0">
 *
 * nid - This is the network ID. If you only belong to one network you do not need to supply a value for this field. However, if you belong to more than one network, you must supply a value for it. The system can only send data for one network at at time. Please note: requesting data for a network you are not in will return an error message.
 *
 *  Network 	 NID
 *  US 	 1
 *  UK 	 3
 *  Canada 	 5
 *  Lead Advantage
 * 	 54
 *
 * Example URL:
 *
 * http://cli.linksynergy.com/cli/publisher/reports/downloadReport.php?bdate=20090101&edate=20090131&cuserid=link&cpi=share&eid=lMh7Xiq9xN0&nid=1
 * The above URL would download a Signature Orders Report for all transactions processed in the month of January 2009 for a publisher whose account username is Òlink,Ó whose password is Òshare,Ó whose LinkShare ID is lMh7Xiq9xN0, and who belongs to the U.S. network. The output file will be in tab-delimited format with the same fields that appear in the Signature Orders Report.
 *
 * Sample Report:
 *
 * Member ID   Advertiser ID    Advertiser Name   Order ID    Transaction Date    Transaction Time    SKU    Number    Sales($)    Quantity    Commissions($)   Process Date   Process Time  
 * 331def  1234 Advertiser Y  2163  1/31/2002  8:58  32  7.99  1 0.39    2/1/2002    12:46   
 * 782ghi  567  Advertiser Z  3020  1/30/2002 20:42  22 0.0395 1 0.00    2/1/2002    17:46   
 * 782ghi  567  Advertiser Z  3323  1/30/2002 18:53  23 0.0295 1 0.00    2/1/2002    17:46
 * 132jkl 1101  Advertiser W  4420  2/1/2002  18:30 530  39.98 2 1.99    2/1/2002    23:46
 *
 * Guidelines for Using the Signature Orders Report Download Feature
 *
 * LinkShare does not recommend or endorse any particular method for integrating these reports with your backend system. However, here are a few general guidelines to consider as you decide what will work best for you.
 *
 * 1) Typically, member IDs are associated with transactions as LinkShare processes them. However, sometimes there will be a slight delay between when a transaction is posted to your online reports and when the member ID is associated with it. This delay could be as short as two days or up to seven days. For this reason, it is not recommended that you run a report for the current day. Please note that member IDs will only be associated to transactions if the publisher has correctly appended the Ô&u1=Õ code to the advertiser link.
 *
 * 2) If you use a proxy server, LinkShare does not recommend using the Signature Orders Report, as the username and password to your LinkShare account are in the URL syntax.
 *
 * 3) We suggest using a network utility such as wget in order to retrieve these reports. Sample 'wget' command syntax:
 *
 * wget -O u1field.txt -S "http://cli.linksynergy.com/cli/publisher/reports/downloadReport.php?bdate=20090101&edate=20090131&cuserid=link&cpi=share&eid=lMh7Xiq9xN0&nid=1"
 *
 * 4) Requesting data for a network (nid) you are not in will return an error message and may cause a script to break. For this reason, we strongly suggest that you do not request data for a network you are not in.
 *
 * For additional information on the Signature Orders Report, please see the Signature Overview (http://helpcenter.linkshare.com/publisher/images/Signature%20Overview_2.1.pdf.
 */

var helpers = require('../helpers')
   ,urls    = require('./urls')
   ;

/**
 * bdate
 * edate
 * cuserid
 * cpi
 * eid
 * nid
 */
exports.service = function (params, callback) {
	var _clean = helpers.clean(params);
	helpers.request(urls.signatureorderreportHost, urls.signatureorderreportPath, _clean, false, callback);
}