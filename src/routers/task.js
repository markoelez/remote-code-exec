const express = require('express')
const router = new express.Router()
const TaskController = require('../controllers/task')
const taskController = new TaskController()

router.post('/java', taskController.deployJava)

module.exports = router
