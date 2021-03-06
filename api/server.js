const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')
const authRouter = require('./auth/auth-router')
const potlucksRouter = require('./potlucks/potlucks-router')
function getAllUsers() { return db('users') }



const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/users', authRouter)
server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})
server.use('/api/potlucks', potlucksRouter)



module.exports = server
