const User = require('../models/user');
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt');


usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    if (body.password.length < 3) {
        return response.status(400).json({ error: "password is too short. Min length is (3)" })
    }

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
