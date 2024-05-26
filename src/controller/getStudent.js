const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const studentId = req.query.id
    if (!studentId) {
        res.status(400).json({ message: 'Student ID is required!' })
        return
    }

    try {
        const student = await Student.findOne({
            where: { id: studentId }
        })
        if (!student) {
            res.status(400).json({ message: 'Student ID is not existed!' })
            return
        }
        res.json(student)
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}