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

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = "Red12345!"
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()