const fs = require('fs').promises
const streams = require('memory-streams')
const { BASE, PLACEHOLDER } = require('./helpers')
const Docker = require('dockerode')

const docker = new Docker()

const JSService = function() {
	this.deploy = async data => {
		try {
			const proc_data = BASE.replace(PLACEHOLDER, data)
			// write input js class
			await fs.writeFile('tmp.js', proc_data)
			// run node file
			const output = await runNode('tmp')
			return output
		} catch (e) {
			console.log(e)
		}
	}
}

const runNode = async file => {
	const stdout = new streams.WritableStream()
	await docker.run('node:8', ['node', `${file}`], stdout, {
		HostConfig: {
			AutoRemove: true,
			Binds: [`${process.cwd()}:/app`]
		},
		WorkingDir: '/app'
	})
	return stdout.toString()
}

module.exports = JSService
