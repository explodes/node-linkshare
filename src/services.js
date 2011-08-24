/**
 * Shortcut for the services package
 */

module.exports = {
	coupon         : require('./services/coupon').service,
	link           : require('./services/link').service,
	merchant       : require('./services/merchant').service,
	targeted       : require('./services/targeted').service,
	paymenthistory : require('./services/paymenthistory').service
}