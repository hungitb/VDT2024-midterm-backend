require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

const client = require('prom-client')
const register = new client.Registry()
register.setDefaultLabels({
    app: 'vdt-students-manager',
    role: 'backend'
})
client.collectDefaultMetrics({ register })

const http_request_counter = new client.Counter({
    name: 'myapp_http_request_count',
    help: 'Count of HTTP requests made to my app',
    labelNames: ['method', 'route', 'statusCode'],
})
register.registerMetric(http_request_counter)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
    req.locals = {}
    req.locals.register = register
    req.locals.end = (code) => console.log(`[${new Date().toISOString()}] ${req.method.toUpperCase()} "${(req.originalUrl.startsWith('/') ? '' : '/') + req.originalUrl}" ==> ${code}`)
    next()
})
app.use((req, res, next) => {
    http_request_counter.labels({method: req.method, route: req.originalUrl, statusCode: res.statusCode}).inc()
    next()
})

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType)
    register.metrics().then(registerMetrics => {
        req.locals.end(200)
        res.send(registerMetrics)
    })
})

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

app.all('/', (req, res) => {
    req.locals.end(400)
    res.status(404).json({ message: 'Not found!' })
})

const server = app.listen(port)
app.closeAllConnections = function () {
    server.close()
}

module.exports = {app}
