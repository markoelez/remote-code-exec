const Dockerode = require('dockerode')

module.exports = async () => {
	// const docker = new Dockerode({ socketPath: '/var/run/docker.sock' })
	const docker = new Dockerode()
	console.log('test: ', 'TEST CHECKPOINT -- 1')

	//promise
	docker
		.run(
			'java:8',
			['javac', 'tmp.java'],
			{
				Volumes: {
					'/app': {}
				},
				WorkingDir: '/app'
			},
			process.stdout
		)
		.then(data => {
			var output = data[0]
			console.log('OUTPUT: ', output)

			var container = data[1]
			console.log(output.StatusCode)
			return container.remove()
		})
		.then(data => {
			console.log('container removed')
		})
		.catch(err => {
			console.log(err)
		})

	// const stdout = new Promise(resolve => {
	// 	console.log('test: ', 'TEST CHECKPOINT -- 3')

	// 	stream.on('data', data => {
	// 		console.log('DATA: ', data)
	// 		const response = data && data.slice(8).toString()
	// 		return resolve(response)
	// 	})
	// })

	// // stream.write(stdin)
	// await container.start()
	// stream.end()
	// await container.wait()
	// container.remove()
	return 0
}
