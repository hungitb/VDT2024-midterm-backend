const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const { id, name, gender, school, birthday, phoneNumber, email, country } = req.body
    if (!id || !name || !gender || !school) {
        res.status(400).json({ message: 'Missing values!' })
        return
    }

    if (gender != 'Nam' && gender != 'Nữ') {
        res.status(400).json({ message: 'Invalid gender!' })
        return
    }

    try {
        await Student.update({
            name, gender, school, birthday, phoneNumber, email, country
        }, {
            where: { id }
        })
        res.json({ message: 'OK' })
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}