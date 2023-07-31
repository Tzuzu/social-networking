const mongoose = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String.trim(), 
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true, 

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;