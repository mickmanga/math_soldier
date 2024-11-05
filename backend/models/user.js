const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const SubjectSchema = require("./subject")  // Import Subject schema

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subjects: [SubjectSchema]
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();
     
    } catch (err) {
        next(err);
    }
});

// Method to compare hashed passwords for login
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
