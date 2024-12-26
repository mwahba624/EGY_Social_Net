import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
const seed = async () => {
    await db();
    // Clear the database
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Cleared the database.');
    }
    catch (error) {
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
    }
    catch (error) {
        console.error('Error seeding DB', error);
    }
};
//seeding DB
seed();
