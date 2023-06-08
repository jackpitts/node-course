// Requires
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Generate the application
const app = express()

// Setup the port automatically, if none goes on 3000
const port = process.env.PORT || 3000

// Automatically parse incoming json to obj
app.use(express.json())

// Register routers
app.use(userRouter)
app.use(taskRouter)

// Start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // 3 arguments, a object, a secret/signature (random string, to sign token) and a options object
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'})
    console.log(token)

    // 2 arguments, token to verify and secret/signature of the token
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()