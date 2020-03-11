const fs = require('fs')
const { exec } = require('child_process')
const {
	BASE_CLASS,
	COMPILE_PROG,
	EXEC_PROG,
	PLACEHOLDER
} = require('../../constants')

const TaskService = function() {
	this.runTask = body => {
		return new Promise((resolve, reject) => {
			let tmp_prog = BASE_CLASS.replace(PLACEHOLDER, body)
			fs.writeFile('tmp.java', tmp_prog, async err => {
				if (err) {
					return reject(err)
				}
				const stdout = await runCommands([COMPILE_PROG, EXEC_PROG])
				return resolve(stdout)
			})
		})
	}
}

const execCommand = cmd => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) return reject(error)
			if (stderr) return reject(stderr)
			return resolve(stdout)
		})
	})
}

const runCommands = commands => {
	return new Promise((resolve, reject) => {
		commands
			.reduce((prev, curr) => {
				return prev.then(outputs => {
					return execCommand(curr).then(stdout => {
						if (stdout.trim() && stdout != undefined) {
							outputs.push(stdout)
						}
						if (!outputs) return []
						return outputs
					})
				})
			}, Promise.resolve([]))
			.then(outputs => {
				return resolve(outputs[0])
			})
			.catch(e => {
				return reject(e)
			})
	})
}

module.exports = TaskService
