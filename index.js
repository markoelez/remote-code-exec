var express = require('express')
const { exec } = require('child_process')
const bodyParser = require('body-parser')
const fs = require('fs')

var app = express()

const BASE_CLASS = `
class Temp {
  public static void main(String[] args) {
    PLACEHOLDER
  }
}
`
const MF_TEMPLATE = `Manifest-Version: 1.0\nMain-Class: Temp
`
const COMMANDS = [
	'javac Temp.java',
	'jar cmf Temp.mf Temp.jar Temp.class Temp.java',
	'java -jar Temp.jar'
]

const execCommand = cmd => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) return reject(error)
			if (stderr) return reject(stderr)
			return resolve(stdout)
		})
	})
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello world!')
})

app.post('/test', (req, res) => {
	let temp_prog = BASE_CLASS.replace('PLACEHOLDER', req.body.program_body)
	fs.writeFile('Temp.java', temp_prog, err => {
		if (err) throw err
		fs.writeFile('Temp.mf', MF_TEMPLATE, err => {
			if (err) throw err
			console.log('Saved file!')
			COMMANDS.reduce((prev, curr) => {
				return prev.then(outputs => {
					return execCommand(curr).then(stdout => {
						if (stdout.trim() && stdout != undefined) {
							outputs.push(stdout)
						}
						if (!outputs) return []
						return outputs
					})
				})
			}, Promise.resolve([]))
				.then(outputs => {
					// res.send(outputs[0])
					// docker run -v Temp.jar:/Temp.jar boot:latest Temp.jar
					exec(
						'docker run -v Temp.jar:/Temp.jar boot:latest Temp.jar',
						(error, stdout, stderr) => {
							if (error) return console.log(error)
							if (stderr) return console.log(stderr)
							console.log(stdout)
							res.send(stdout)
						}
					)
				})
				.catch(err => res.send(err))
		})
	})
})

app.listen(3001, () => {
	console.log('App listening on port 3001...')
})
