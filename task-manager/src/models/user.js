const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// User schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cant contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// Doing something before user saved
userSchema.pre('save', async function (next) {
    const user = this

    // hashing password
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // stops the function
    next()
})

// User model
const User = mongoose.model('User', userSchema)

// Export to other files
module.exports = User