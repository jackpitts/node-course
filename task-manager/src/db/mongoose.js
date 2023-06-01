const mongoose = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')