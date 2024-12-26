import mongoose from 'mongoose';
import User from '../models/User';
import Thought from '../models/Thought';
import DataB from '../utils/DataB'; 

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

    console.log('Connected to MongoDB');

    // Clean database
    await DataB();

    // Create users
    const users = await User.insertMany([
      {
        username: 'User1',
        email: 'user1@example.com',
      },
      {
        username: 'User2',
        email: 'user2@example.com',
      },
      {
        username: 'User3',
        email: 'user3@example.com',
      },
    ]);

    console.log('Users created:', users);

    // Create thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: 'This is User1\'s first thought.',
        username: users[0].username,
        userId: users[0]._id,
        reactions: [
          {
            reactionBody: 'Great thought!',
            username: users[1].username,
          },
        ],
      },
      {
        thoughtText: 'This is User2\'s first thought.',
        username: users[1].username,
        userId: users[1]._id,
      },
      {
        thoughtText: 'This is User3\'s first thought.',
        username: users[2].username,
        userId: users[2]._id,
        reactions: [
          {
            reactionBody: 'I love this thought!',
            username: users[0].username,
          },
        ],
      },
    ]);

    console.log('Thoughts created:', thoughts);

    // Update users with thoughts
    await Promise.all(
      thoughts.map((thought) =>
        User.findByIdAndUpdate(thought.userId, { $push: { thoughts: thought._id } })
      )
    );

    console.log('Users updated with thoughts');

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeded and connection closed');
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();



/*
import db from '../config/connection.js';
import { getThoughts } from '../controllers/thoughtController.js';
import { User, Thought } from '../models/index.js';

const seed = async () => {
  await db();

  // Clear the database
try {
  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log('Cleared the database.');
} catch (error) {
  console.error('Error clearing the database:', error);
}
  try {
    // Create users
    const users = await User.create([
      {
        username: 'User1',
        email: 'user1@gmail.com',
      },
      {
        username: 'User2',
        email: 'user2@gmail.com',
      },
      {
        username: 'User3',
        email: 'user3@gmail.com'
      }
    ]);
    console.log('Users created:', users);
    // create 2 thoughts
    const thoughts = await Thought.create([
      {
        thoughtText: 'Thought 1',
        username: users[0].username,
        userId: users[0]._id
      },
      {
        thoughtText: 'Thought 2',
        username: users[1].username,
        userId: users[1]._id
      }
    ]);
    console.log('Thoughts created:', thoughts);

  } catch (error) {
    console.error('Error seeding DB', error);
  }
}
// add thoughts to users
for (const thought of Thoughts) {
  const user = await User.findOne({ _id: thought.userId });
  if (user) {
    user.thoughts.push(thought);
    await user.save();
  }
}
console.log('Thoughts added to users.');

// add reactions to random thoughts
const reactions = [
  {
    reactionBody: '👍',
    username: getRandomUser(users).username,
    createdAt: new Date(),
  },
  {
    reactionBody: '❤️',
    username: getRandomUser(users).username,
    createdAt: new Date(),
  },
  {
    reactionBody: '😆',
    username: getRandomUser(users).username,
    createdAt: new Date(),
  },
];

 //seeding DB
seed();

*/
