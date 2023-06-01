// Requires
const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

// Create task (app.post)
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Fetch all tasks stored in db
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// Fetch individual task with route parameter (id)
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.send(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Update an task, 3 arguments: id, fields to update, options
router.patch('/tasks/:id', async (req, res) => {

    // Has everything stored in the body as an object
    const updates = Object.keys(req.body)

    // Has all allowed update fields
    const allowedUpdates = ['description', 'completed']

    // Run function for every item in the array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Run if invalid updates
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a task by its id
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send({ error: "no task found!" })
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Exports the file
module.exports = router