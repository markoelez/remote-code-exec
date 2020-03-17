const express = require('express')
const router = new express.Router()

const TaskController = require('../controllers/task')
const taskController = new TaskController()

router.post('/java', taskController.deployJava)

router.post('/javascript', taskController.deployJS)

module.exports = router
