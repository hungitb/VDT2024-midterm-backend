const Student = require('../../database/models/Student').getModel()
module.exports = async function(req, res) {
    const { id, name, gender, school, birthday, phoneNumber, email, country } = req.body
    if (!id || !name || !gender || !school) {
        req.locals.end(400)
        res.status(400).json({ message: 'Missing values!' })
        return
    }

    if (gender != 'Nam' && gender != 'Nữ') {
        req.locals.end(400)
        res.status(400).json({ message: 'Invalid gender!' })
        return
    }

    try {
        await Student.update({
            name, gender, school, birthday, phoneNumber, email, country
        }, {
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