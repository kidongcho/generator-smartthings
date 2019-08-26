'use strict'

/**
 * When user removed c2c intrgration, to clean up integration in third party side, SmartThings sends an integration deleted request.
 * Return format is not defined.(Empty obejct can be returned)
 * @param {*} integrationDeleted
 */
function handleIntegrationDeleted(integrationDeleted) {
	console.log(JSON.stringify(integrationDeleted))
}

module.exports = {
    handle: (event) => handleIntegrationDeleted(event)
}