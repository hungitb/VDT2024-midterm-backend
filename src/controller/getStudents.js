const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    try {
        const students = await Student.findAll()
        req.locals.end(200)
        res.json(students)
    }
    catch (error) {
        console.log(error.message)
        req.locals.end(500)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}