require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const getStudents = require('./controller/getStudents')
app.get('/api/students', getStudents)

const getStudent = require('./controller/getStudent')
app.get('/api/student', getStudent)

const postStudent = require('./controller/postStudent')
app.post('/api/student', postStudent)

const putStudent = require('./controller/putStudent')
app.put('/api/student', putStudent)

const deleteStudent = require('./controller/deleteStudent')
app.delete('/api/student', deleteStudent)

const server = app.listen(port)
app.closeAllConnections = function () {
    server.close()
}

module.exports = {app}
