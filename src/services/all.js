/**
 * Shortcut for the services package
 */

module.exports = {
	coupon   : require('./coupon').service,
	link     : require('./link').service,
	merchant : require('./merchant').service,
	targeted : require('./targeted').service
}