const express = require('express')
const router = new express.Router()
const TaskController = require('../controllers/task')
const taskController = new TaskController()

router.post('/tasks/run', taskController.runTask)

module.exports = router
