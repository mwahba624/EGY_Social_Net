import { Schema, model, Types } from 'mongoose';
// Reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    }, // Workaround for TypeScript error
}, {
    toJSON: {
        getters: true,
    },
    id: false,
    _id: false,
});
// Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    }, // Workaround for TypeScript error
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        versionKey: false,
    },
    id: false,
});
// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Thought model
const Thought = model('Thought', thoughtSchema);
export default Thought;
