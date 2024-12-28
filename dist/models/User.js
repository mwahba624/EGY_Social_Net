import { Schema, model } from 'mongoose';
// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
    id: false,
});
// Virtual to calculate total count of friends
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
// Initialize the User model
const User = model('User', userSchema);
export default User;
