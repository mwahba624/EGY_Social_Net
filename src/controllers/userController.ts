import { User, Thought } from '../models/index.js';
import { Types } from 'mongoose';
import { Request, Response } from 'express';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a single user

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts') //  Populate the thoughts associated with the user
      .populate('friends'); // Populate the friends associated with the user
    if (!user) {
      return res.status(404).json({ message: 'No User with that ID' });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update a user by its _id by PUT method
export const updateUser = async (req: Request, res: Response) => {
  try {
    // update the user by its _id and only update the email field
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId }, // Find user by its _id
      {email: req.body.email}, // The new data to update the user with - only updating email field
      { new: true, runValidators: true } // Return the updated user and run validation on update
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// DELETE Route 
export const deleteUser = async (req: Request, res: Response) => {
  try {
    
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    await User.updateMany(
      { friends: req.params.userId }, // Find all users where the user to be deleted is in their friend list
      { $pull: { friends: req.params.userId } } // Remove the user to be deleted from their friend list
    );

    // Step 3: Delete the user
    await User.findOneAndDelete({ _id: req.params.userId });

    res.json({ message: 'User, associated thoughts, and friendships have been deleted' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// POST: Add a new friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Ensure the friend is not the user themself
    if (userId === friendId) {
      return res.status(400).json({ message: "Users cannot add themselves as friends." });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the friend to ensure they exist
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found." });
    }

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(new Types.ObjectId(friendId))) {
      return res.status(400).json({ message: "Friend already in the user's friend list." });
    }

    // Add the friend to the user's friend list
    user.friends.push(new Types.ObjectId(friendId));

    // Save the updated user
    await user.save();

    res.json({ message: "Friend added successfully.", user });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// DELETE: Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the friend is in the user's friend list
    if (!user.friends.includes(new Types.ObjectId(friendId))) {
      return res.status(400).json({ message: "Friend not found in the user's friend list." });
    }

    // Remove the friend from the user's friend list
    user.friends = user.friends.filter((id) => id.toString() !== friendId);

    // Save the updated user
    await user.save();

    res.json({ message: "Friend removed successfully.", user });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};