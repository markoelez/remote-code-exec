const fs = require('fs').promises
const streams = require('memory-streams')
const { BASE_CLASS, PLACEHOLDER, UTILS_CLASS } = require('../../constants')
const Docker = require('dockerode')

const docker = new Docker()

const TaskService = function() {
	this.deployJava = async data => {
		try {
			// write input java class
			await fs.writeFile('Solution.java', data)
			// write base java class
			await fs.writeFile('Main.java', BASE_CLASS)
			// compile base
			await runCompile('Main.java')
			// compile input
			await runCompile('Solution.java')
			// run base
			const output = await runBinary('Main')
			console.log('OUTPUT: ', output)
			// cleanup
			await fs.writeFile('Solution.java', '')
			await fs.writeFile('Solution.class', '')
			return output
		} catch (e) {
			console.log(e)
		}
	}
}

const process_input = input => {
	// const res = BASE_CLASS.replace(PLACEHOLDER, input)
	const classDef = 'class Solution '
	const classBodyStartIDX = input.indexOf
	return res
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

module.exports = TaskService
