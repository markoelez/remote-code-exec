var express = require('express')
const { exec } = require('child_process')
const bodyParser = require('body-parser')
const fs = require('fs')

var app = express()

const BASE_CLASS = `
class tmp {
  public static void main(String[] args) {
    PLACEHOLDER
  }
}
`
const MF_tmpLATE = `Manifest-Version: 1.0\nMain-Class: tmp
`
const COMMANDS = [
	'javac tmp.java',
	'jar cmf MANIFEST.mf tmp.jar tmp.class tmp.java',
	'java -jar tmp.jar'
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

app.post('/test', (req, res) => {
	let tmp_prog = BASE_CLASS.replace('PLACEHOLDER', req.body.program_body)
	fs.writeFile('tmp.java', tmp_prog, err => {
		if (err) throw err
		fs.writeFile('MANIFEST.mf', MF_tmpLATE, err => {
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
					console.log(outputs)
					res.send(outputs[0])
					// docker run -v tmp.jar:/tmp.jar boot:latest tmp.jar
					// exec(
					// 	'docker run -v tmp.jar:/tmp.jar boot:latest tmp.jar',
					// 	(error, stdout, stderr) => {
					// 		if (error) return console.log(error)
					// 		if (stderr) return console.log(stderr)
					// 		console.log(stdout)
					// 		res.send(stdout)
					// 	}
					// )
				})
				.catch(err => res.send(err))
		})
	})
})

app.listen(3002, () => {
	console.log('App listening on port 3002...')
})
