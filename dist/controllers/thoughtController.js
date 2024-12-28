import { Thought, User } from '../models/index.js';
// Get all thoughts
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Get a single thought
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Create a new thought and associate it with the user's thoughts array
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        // Find the user by username and push the new thought's _id to their thoughts array
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.thoughts.push(thought._id);
        // Save the updated user document
        await user.save();
        // Return the newly created thought
        res.json(thought);
        return;
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
        return;
    }
};
// PUT route to update a thought
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        // Check if the thought exists
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        // Only allow the user who created the thought to modify it
        if (thought.username !== req.body.username) {
            return res.status(403).json({ message: 'You can only update your own thoughts' });
        }
        // Update only the thoughtText
        thought.thoughtText = req.body.thoughtText;
        // Save the updated thought
        await thought.save();
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// DELETE route to delete a thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        // Check if the thought exists
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        // Only allow the user who created the thought to delete it
        if (thought.username !== req.body.username) {
            return res.status(403).json({ message: 'You can only delete your own thoughts' });
        }
        // Delete the thought and associated reactions
        await Thought.findByIdAndDelete(req.params.thoughtId);
        res.json({ message: 'Thought and its reactions have been deleted' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
//POST to create a reaction stored in a single thought's reactions array field
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        thought.reactions.push({
            reactionBody: req.body.reactionBody,
            username: req.body.username,
        });
        await thought.save();
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
//DELETE to pull and remove a reaction by the reaction's reactionId value
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        // Pull and remove the reaction from the reactions array
        thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== req.params.reactionId);
        await thought.save();
        res.json({ message: 'Reaction has been deleted' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
