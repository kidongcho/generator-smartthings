'use strict'

/**
 * When SmartThings receives an access token from a third party, it sends a callback authentication code. The third party can use this code to request callback access tokens.
 * Return format is not defined.(Empty obejct can be returned)
 * https://smartthings.developer.samsung.com/docs/guides/smartthings-schema/smartthings-schema-reference.html#Reciprocal-access-token
 * @param {*} grantCallbackAccess
 */
function handleGrantCallbackAccess(grantCallbackAccess) {
	console.log(JSON.stringify(grantCallbackAccess))
}

module.exports = {
    handle: (event) => handleGrantCallbackAccess(event)
}