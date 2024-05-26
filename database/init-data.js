require('dotenv').config()
const mysql = require('mysql2')

const { MYSQL_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE_NAME } = process.env

const conn = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
})

conn.query(`create database if not exists \`${MYSQL_DATABASE_NAME}\`;`, err => {
    if (err) {
        console.error(err)
        conn.end()
    } else {
        console.log('Create database successfully!')
        const sequelize = require('./database')
        const {getModel} = require('./models/Student')
        getModel()
        sequelize.sync().then(() => {
            sequelize.close()
            conn.end()
        })
        .catch(err => {
            console.error(err)
        })
    }
})
