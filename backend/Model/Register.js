const mongoose = require('mongoose');
const validator = require('validator');

const passwordValidator = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(value);
};

const UserSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, 'Please enter First Name']
    },
    LastName:{
        type: String,
        required: [true, 'Please enter Last Name']
    },

    UserEmail: {
        type: String,
        required: [true, 'Please enter Email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    PhoneNumber:{
        type: String,
        required: [true, 'Please enter Phone Number']
    },

    UserPassword: {
        type: String,
        required: [true, 'Please enter Password'],
        validate: {
            validator: passwordValidator,
            message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)'
        }
    },

    favoriteMeals: [{
        mealId: String,
        mealName: String,
        thumbnail: String
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserData', UserSchema);