const fs = require('fs').promises
const streams = require('memory-streams')
const { getBaseFromTestCases } = require('./helpers')
const Docker = require('dockerode')

const docker = new Docker()

const JavaService = function() {
	this.deploy = async (data, testCaseData) => {
		// first get a runnable base method
		const base = getBaseFromTestCases(
			testCaseData.baseMethod,
			testCaseData.data
		)
		try {
			// write input java class
			await fs.writeFile('Solution.java', data)
			// write base java class
			await fs.writeFile('Main.java', base)
			// compile base
			await runCompile('Main.java')
			// compile input
			await runCompile('Solution.java')
			// run base
			const output = await runBinary('Main')
			// cleanup
			await fs.writeFile('Solution.java', '')
			await fs.writeFile('Solution.class', '')
			return output
		} catch (e) {
			console.log(e)
		}
	}
}

const runCompile = async file => {
	return docker.run('java:8', ['javac', `${file}`], process.stdout, {
		HostConfig: {
			AutoRemove: true,
			Binds: [`${process.cwd()}:/app`]
		},
		WorkingDir: '/app'
	})
}

const runBinary = async file => {
	const stdout = new streams.WritableStream()
	await docker.run('java:8', ['java', `${file}`], stdout, {
		HostConfig: {
			AutoRemove: true,
			Binds: [`${process.cwd()}:/app`]
		},
		WorkingDir: '/app'
	})
	console.log('STDOUT: ', stdout.toString())
	return stdout.toString()
}

module.exports = JavaService
