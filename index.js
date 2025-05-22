module.exports = {
	nodeTypes: {
		Finolog: require('./dist/nodes/Finolog/Finolog.node.js'),
	},
	credentialTypes: {
		FinologApi: require('./dist/credentials/FinologApi.credentials.js'),
	},
}; 