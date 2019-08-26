'use strict'

// Prepairing the device template is a convenience way to configure response
const ST_DEVICE_TEMPLATE =  {
	externalDeviceId: '',
	deviceCookie: {},
	friendlyName: 'Template Bulb',
	manufacturerInfo: {
		manufacturerName: 'XYZ-Company',
		modelName: 'XYZ Color Bulb',
		hwVersion: 'v1 XYZ Bulb',
		swVersion: '1.123.123'
	},
	deviceContext : {
		roomName: 'Livinig Room',
		groups: ['Switch', 'Outlet'],
		categories: ['switch']
	},
	deviceHandlerType: "c2c-switch"
}

/**
 * Handle the request by retrieving an initial list of devices
 * https://smartthings.developer.samsung.com/docs/guides/smartthings-schema/smartthings-schema-reference.html#Discovery
 * @param {*} discoveryRequest
 */
function handleDiscoveryRequest(discoveryRequest) {
	// Get the access token.
	// NOTE : In this sample, we don't use access token.
	const accessToken = discoveryRequest.authentication.accessToken

	// Get the device list. This sample returns pre-defined devices {device:'100'} and {device:'200'}
	return Promise.resolve([{deviceId:'100'},{deviceId:'200'}])
	// Then, transform and return
		.then(deviceList => {
			// Prepair response template
			let result = {
				headers: {
					schema: 'st-schema',
					version: '1.0',
					interactionType: 'discoveryResponse',
					requestId: discoveryRequest.headers.requestId
				},
				devices = []
			}

			// Fill in devices field with prepaired device template
			for(let device of deviceList) {
				// Copy a device instance
				let stDevice = Object.assign({}, ST_DEVICE_TEMPLATE)
				// Replace device specific
				stDevice.externalDeviceId = device.deviceId
				// Add the device into response template
				result.devices.push(stDevice)
			}

			return result
		})
}

module.exports = {
    handle = (event) => handleDiscoveryRequest(event)
}