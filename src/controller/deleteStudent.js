const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const { id } = req.body
    if (!id) {
        res.status(400).json({ message: 'ID is required!' })
        return
    }

    try {
        await Student.destroy({
            where: { id }
        })
        res.json({ message: 'OK' })
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}