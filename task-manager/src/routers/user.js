// Requires
const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// Create user (app.post)
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Find user by credentials
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})  

// Fetch all users stored in db
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// Fetch individual user with route parameters (id)
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// Update an user, 3 arguments: id, fields to update, options
router.patch('/users/:id', async (req, res) => {

    // Has everything stored in the body as an object
    const updates = Object.keys(req.body)

    // Has all allowed update fields
    const allowedUpdates = ['name', 'email', 'password', 'age']

    // Run function for every item in the array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Run if invalid updates
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({ error: "no user found!" })
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// Exports the file
module.exports = router