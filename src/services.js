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
	advertiserpayment : require('./services/advertiserpayment').service,
	paymentdetail     : require('./services/paymentdetail'),
	paymenthistory    : require('./services/paymenthistory').service
}