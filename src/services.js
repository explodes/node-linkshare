/**
 * Shortcut for the services package
 */

module.exports = {
	// STANDARD
	coupon   : require('./services/coupon').service,
	link     : require('./services/link').service,
	merchant : require('./services/merchant').service,
	targeted : require('./services/targeted').service,
	// SECURE
	advertiserpayments : require('./services/advertiserpayments').service,
	paymenthistory     : require('./services/paymenthistory').service
}