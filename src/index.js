require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const taskRouter = require('./routers/task')

const initializeExpress = () => {
	const app = express()

	// setup middleware
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.use(cors())

	// setup routers
	app.use('/api/tasks/', taskRouter)

	const port = process.env.PORT || 5000
	app.listen(port, () => console.log(`Server running on port ${port} !`))
}

const initializeApp = async () => {
	initializeExpress()
}

initializeApp()
