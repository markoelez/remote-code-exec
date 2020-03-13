const fs = require('fs')
const streams = require('memory-streams')
const { BASE_CLASS, PLACEHOLDER } = require('../../../constants')
const Docker = require('dockerode')

const docker = new Docker()

const TaskService = function() {
	this.deployJava = body => {
		return new Promise((resolve, reject) => {
			let tmp_prog = BASE_CLASS.replace(PLACEHOLDER, body)
			fs.writeFile('tmp.java', tmp_prog, async err => {
				if (err) {
					return reject(err)
				}
				// process file in container
				try {
					await runCompile()
					const output = await runBinary()
					return resolve(output)
				} catch (e) {
					return reject(e)
				}
			})
		})
	}
}

const runCompile = async () => {
	return docker.run('java:8', ['javac', 'tmp.java'], process.stdout, {
		HostConfig: {
			AutoRemove: true,
			Binds: [`${process.cwd()}:/app`]
		},
		WorkingDir: '/app'
	})
}

const runBinary = async () => {
	const stdout = new streams.WritableStream()
	await docker.run('java:8', ['java', 'tmp'], stdout, {
		HostConfig: {
			AutoRemove: true,
			Binds: [`${process.cwd()}:/app`]
		},
		WorkingDir: '/app'
	})
	return stdout.toString()
}

module.exports = TaskService
