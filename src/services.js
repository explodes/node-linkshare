/**
 * Shortcut for the services package
 */

module.exports = {
	// STANDARD
	coupon        : require('./services/standard/coupon').service,
	linkgenerator : require('./services/standard/linkgenerator').service,
	merchant      : require('./services/standard/merchantquery').service,
	targeted      : require('./services/standard/targeted').service,
	// SECURE
	advertiserpayment : require('./services/secure/advertiserpayment').service,
	paymentdetail     : require('./services/secure/paymentdetail').service,
	paymenthistory    : require('./services/secure/paymenthistory').service,
	// LINKLOCATOR
	advertiserinfo : require('./services/linklocator/advertiserinfo').service
}