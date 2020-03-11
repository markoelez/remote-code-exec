const TaskService = require('../services/TaskService')
const TaskProvider = new TaskService()

class TaskController {
	constructor() {
		// do nothing
	}

	async runTask(req, res) {
		try {
			const body = req.body

			const stdout = await TaskProvider.runTask(body.data)

			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}
}

module.exports = TaskController
