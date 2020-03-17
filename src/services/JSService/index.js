const fs = require('fs').promises
const streams = require('memory-streams')
const { getBaseFromTestCases } = require('./helpers')
const Docker = require('dockerode')

const docker = new Docker()

const JSService = function() {
	this.deploy = async (data, testCaseData) => {
		const base = getBaseFromTestCases(
			testCaseData.baseMethod,
			testCaseData.data,
			data
		)
		try {
			// write input js class
			await fs.writeFile('tmp.js', base)
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
