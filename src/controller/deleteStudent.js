const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const { id } = req.body
    if (!id) {
        req.locals.end(400)
        res.status(400).json({ message: 'ID is required!' })
        return
    }

    try {
        await Student.destroy({
            where: { id }
        })
        req.locals.end(200)
        res.json({ message: 'OK' })
    }

    catch (error) {
        req.locals.end(500)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}