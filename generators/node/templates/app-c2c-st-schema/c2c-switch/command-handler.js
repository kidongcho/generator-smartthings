'use strict'

/**
 * Handle the request by triggering the commands for the list of devices
 * https://smartthings.developer.samsung.com/docs/guides/smartthings-schema/smartthings-schema-reference.html#Command
 * @param {*} commandRequest
 */
function handleCommandRequest(commandRequest) {
	// Get the access token to send command
	const accessToken = commandRequest.authentication.accessToken

	let promises = []

	// Number of commands is 1+. So we should handle each of them 
	for(const stDevice of commandRequest.devices) {
		const deviceId = stDevice.externalDeviceId
		// For a device
		for(const command of stDevice.commands) {
			// If this command is related switch
			if(command.capability === 'st.switch') {
				// If your API supports multiple commands in a command, you can aggregate in a promise rather then using promise array
				promises.push(turnSwitch(command.command === 'on' ? 1 : 0, deviceId, accessToken).then(
					// This code shows that a response for a command request is converted back to st-schema device state
					response => (
						{
							externalDeviceId: deviceId,
							deviceCookie: {},
							states: [
								{
									component: 'main',
							        capability: 'st.switch',
          							attribute: 'switch',
          							value: response.value
								}
							]
						}
					)
				))
			}
		}
	}

	// Each promise returns state of a device for st-schema. If you need to aggregate the response, you can do it here.
	// And then, configure response template.
	return Promise.all(promises).then(deviceStates => ({
		headers: {
			schema: 'st-schema',
			version: '1.0',
			interactionType: 'commandResponse',
			requestId: commandRequest.headers.requestId
		},
		deviceState: deviceStates
	}))
}

/**
 * API will be called by this function. In this sample, this method does nothing and just returns incomming request.
 * @param {*} value 
 * @param {*} deviceId 
 * @param {*} accessToken 
 */
function turnSwitch(value, deviceId, accessToken) {
	return Promise.resolve({
		deviceId: deviceId,
		value: value
	})
}

module.exports = {
    handle = (event) => handleCommandRequest(event)
}