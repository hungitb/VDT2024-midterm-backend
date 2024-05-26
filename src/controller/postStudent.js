const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const { name, gender, school, birthday, phoneNumber, email, country } = req.body
    if (!name || !gender || !school) {
        res.status(400).json({ message: 'Missing values!' })
        return
    }

    if (gender != 'Nam' && gender != 'Nữ') {
        res.status(400).json({ message: 'Invalid gender!' })
        return
    }

    try {
        await Student.create({
            name, gender, school, birthday, phoneNumber, email, country
        })
        res.json({ message: 'OK' })
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}