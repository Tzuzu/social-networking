const { Schema } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // Help through BCS to remove
        // default: () => {
        //     return new Schema.Types.ObjectId
        // },
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280, 
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            return date.toLocaleDateString();
        }
    },
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
})

module.exports = reactionSchema;