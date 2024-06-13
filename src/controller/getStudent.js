const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const studentId = req.query.id
    if (!studentId) {
        req.locals.end(400)
        res.status(400).json({ message: 'Student ID is required!' })
        return
    }

    try {
        const student = await Student.findOne({
            where: { id: studentId }
        })
        if (!student) {
            req.locals.end(400)
            res.status(400).json({ message: 'Student ID is not existed!' })
            return
        }
        req.locals.end(200)
        res.json(student)
    }
    catch (error) {
        req.locals.end(500)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}