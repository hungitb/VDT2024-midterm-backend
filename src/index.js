require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const getStudents = require('./controller/getStudents')
app.get('/api/students', getStudents)

const server = app.listen(port)
app.closeAllConnections = function () {
    server.close()
}

module.exports = {app}
