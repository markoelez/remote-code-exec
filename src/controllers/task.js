const TaskService = require('../services/TaskService')
const TaskProvider = new TaskService()

class TaskController {
	constructor() {
		// do nothing
	}

	async deployJava(req, res) {
		const { data, testCases } = req.body
		console.log('data: ', data)
		console.log('testCases: ', testCases)

		try {
			const stdout = await TaskProvider.deployJava(data, testCases)
			console.log('response: ', stdout)

			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}

	async deployJS(req, res) {
		const data = req.body.data
		console.log('request: ', data)

		try {
			const stdout = await TaskProvider.deployJS(data)
			console.log('response: ', stdout)

			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}
}

module.exports = TaskController
