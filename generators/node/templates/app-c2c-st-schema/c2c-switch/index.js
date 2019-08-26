'use strict'

/**
 * Handlers
 */
const discoveryRequestHandler = require('./discovery-handler')
const stateRefreshRequestHandler = require('./state-refresh-handler')
const commandRequestHandler = require('./command-handler')
const grantCallbackAccessHandler = require('./grant-callback-access-handler')
const integrationDeletedHandler = require('./integration-deleted-handler')

const HANDLER = {
	discoveryRequest: discoveryRequestHandler,
	stateRefreshRequest: stateRefreshRequestHandler,
	commandRequest: commandRequestHandler,
	grantCallbackAccess: grantCallbackAccessHandler,
	integrationDeleted: integrationDeletedHandler
	// Add here new requests
}

// This is the entry point of this integration. This function routes the request from SmartThings.
module.exports.handler = event => {
	console.log(JSON.stringify(event))
	return HANDLER[event.headers.interactionType].handle(event)
		.then(result => {
			console.log(JSON.stringify(result))
			return result
		})
}
