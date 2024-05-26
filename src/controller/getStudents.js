const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    try {
        const students = await Student.findAll()
        res.json(students)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}