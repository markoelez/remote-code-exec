const getEnv = require('./getEnv')

const serverStart = async () => {
	if (process.env.NODE_ENV == 'production') {
		// production config TODO
	} else {
		await getEnv()
		const server = require('./server')
		server.listen(process.env.PORT, () => {
			console.log('Listening on port ', process.env.PORT, '...')
		})
	}
}

serverStart()
