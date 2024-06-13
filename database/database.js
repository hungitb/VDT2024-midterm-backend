require('dotenv').config()
const Sequelize = require('sequelize')

const { MYSQL_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE_NAME } = process.env

const sequelize = new Sequelize(
    MYSQL_DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: 'mysql',
        logging: false
    }
)

module.exports = sequelize
