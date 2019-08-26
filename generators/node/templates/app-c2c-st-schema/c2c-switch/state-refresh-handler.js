'use strict'

/**
 * Handle the request by retrieving the device states for the indicated list of devices
 * https://smartthings.developer.samsung.com/docs/guides/smartthings-schema/smartthings-schema-reference.html#State-Refresh
 * @param {*} stateRefreshRequest
 */
function handleStateRefreshRequest(stateRefreshRequest) {
	// Get the access token to query the device status
	const accessToken = stateRefreshRequest.authentication.accessToken
	
	let promises = []
	// For each of devices. If your API supports getting multiple state at once, you can use it.
	for(const stDevice of stateRefreshRequest.devices) {
		// Get state of a device and transform to st-schema form.
		promises.push(getDeviceState(stDevice.externalDeviceId).then(status => ({
			externalDeviceId: stDevice.externalDeviceId,
			deviceCookie: {},
			states: [
				{
					component: 'main',
					capability: 'st.switch',
					attribute: 'switch',
					value: status.value == 1 ? 'on' : 'off'
				}
			]
		})))
	}

	// Aggregate device states to response template
	return Promise.all(promises).then(deviceStatusArray => ({
		headers: {
			schema: 'st-schema',
			version: '1.0',
			interactionType: 'stateRefreshResponse',
			requestId: stateRefreshRequest.headers.requestId
		},
		deviceState : deviceStatusArray
	}))
}

function getDeviceState(deviceId) {
	// In this sample, this api returns a Promise which wraps an random integer 0 or 1. We assume 1 is on and 0 is off.
	return Promise({
		deviceId: deviceId,
		value: Math.floor(Math.random() * Math.floor(2))
	})
}

module.exports = {
    handle = (event) => handleStateRefreshRequest(event)
}