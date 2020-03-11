let express = require('express')
const fs = require('fs')
const { exec } = require('child_process')
const bodyParser = require('body-parser')
const { BASE_CLASS, COMPILE_PROG, EXEC_PROG } = require('./constants')

let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/test', (req, res) => {
	let tmp_prog = BASE_CLASS.replace('PLACEHOLDER', req.body.data)

	fs.writeFile('tmp.java', tmp_prog, async err => {
		if (err) throw err
		await execCommand(COMPILE_PROG).catch(e => {
			return res.send(Error('Invalid Input!'))
		})
		const output = await execCommand(EXEC_PROG).catch(e => {
			return res.send(Error('Invalid Input!'))
		})
		return res.send(output)
	})
})

app.listen(3002, () => {
	console.log('App listening on port 3002...')
})

const execCommand = cmd => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) return reject(error)
			if (stderr) return reject(stderr)
			return resolve(stdout)
		})
	})
}
