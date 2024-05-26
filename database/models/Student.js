const Sequelize = require('sequelize') 
const sequelize = require('../database')

let Student = null

module.exports = {
    getModel () {
        if (!Student) {
            Student = sequelize.define('students', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                name: { type: Sequelize.STRING, allowNull: false },
                gender: { type: Sequelize.STRING, allowNull: false },
                school: { type: Sequelize.STRING, allowNull: false },
                birthday: { type: Sequelize.STRING },
                country: { type: Sequelize.STRING },
                email: { type: Sequelize.STRING },
                phoneNumber: { type: Sequelize.STRING }
            })
        }
        
        return Student
    }
}
