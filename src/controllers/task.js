const TaskService = require('../services/TaskService')
const TaskProvider = new TaskService()

class TaskController {
	constructor() {
		// do nothing
	}

	async deployJava(req, res) {
		const body = req.body

		try {
			const stdout = await TaskProvider.deployJava(body.data)
			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}
}

module.exports = TaskController
