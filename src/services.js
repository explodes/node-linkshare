/**
 * Shortcut for the services package
 */

module.exports = {
	// STANDARD
	coupons       : require('./services/standard/coupons').service,
	linkgenerator : require('./services/standard/linkgenerator').service,
	merchant      : require('./services/standard/merchantquery').service,
	targeted      : require('./services/standard/targeted').service,
	// SECURE
	advertiserpayment : require('./services/secure/advertiserpayment').service,
	paymentdetail     : require('./services/secure/paymentdetail').service,
	paymenthistory    : require('./services/secure/paymenthistory').service,
	// LINKLOCATOR
	advertiserinfo     : require('./services/linklocator/advertiserinfo').service,
	bannerlinks        : require('./services/linklocator/bannerlinks').service,
	creativecategories : require('./services/linklocator/creativecategories').service,
	drmlinks           : require('./services/linklocator/drmlinks').service,
	productlinks       : require('./services/linklocator/productlinks').service,
	textlinks          : require('./services/linklocator/textlinks').service
}