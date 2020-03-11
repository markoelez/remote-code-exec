let express = require('express')
const bodyParser = require('body-parser')
const taskRouter = require('../routers/task')
const http = require('http')
const app = express()

let server, serverHttps

if (process.env.NODE_ENV == 'production') {
	// handle production config
}

server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(taskRouter)

if (process.env.NODE_ENV === 'production') {
	module.exports = { server, serverHttps }
} else {
	module.exports = server
}
