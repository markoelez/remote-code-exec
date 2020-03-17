const JavaService = require('../services/JavaService')
const JSService = require('../services/JSService')

class TaskController {
	constructor() {
		// do nothing
	}

	async deployJava(req, res) {
		const { data, testCases } = req.body
		console.log('data: ', data)
		console.log('testCases: ', testCases)
		const TaskProvider = new JavaService()
		try {
			const stdout = await TaskProvider.deploy(data, testCases)
			console.log('response: ', stdout)

			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}

	async deployJS(req, res) {
		const { data, testCases } = req.body
		console.log('data: ', data)
		console.log('testCases: ', testCases)
		const TaskProvider = new JSService()
		try {
			const stdout = await TaskProvider.deploy(data, testCases)
			console.log('response: ', stdout)

			res.status(200).send(stdout)
		} catch (e) {
			const errorCode = e.code | 500
			res.status(errorCode).send(e)
		}
	}
}

module.exports = TaskController
