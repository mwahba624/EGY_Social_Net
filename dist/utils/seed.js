import { User, Thought } from '../models/index.js';
import DataB from './DataB.js';
import db from '../config/connection.js';
// Helper function to get a random element from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const seedDatabase = async () => {
    try {
        await db();
        await DataB();
        console.info('Database cleaned! 🌱');
        // Create 3 users with explicit createdAt
        const users = await User.create([
            { username: 'user1', email: 'user1@example.com' },
            { username: 'user2', email: 'user2@example.com' },
            { username: 'user3', email: 'user3@example.com' },
        ]);
        console.log('Users created:', users);
        // Create 2 thoughts and assign to random users
        const thoughts = await Thought.create(users.map((user) => ({
            thoughtText: `${user.username}'s thought!`,
            username: user.username,
        })));
        console.log('Thoughts created:', thoughts);
        // Add thoughts to corresponding users
        for (const thought of thoughts) {
            const user = await User.findOne({ username: thought.username });
            if (user) {
                user.thoughts.push(thought._id);
                await user.save();
            }
        }
        console.log('Thoughts associated with users.');
        // Add 3 reactions to random thoughts
        const reactions = [
            {
                reactionBody: 'Great idea!',
                username: getRandomItem(users).username,
            },
            {
                reactionBody: 'Interesting idea!',
                username: getRandomItem(users).username,
            },
            {
                reactionBody: 'Love this idea!',
                username: getRandomItem(users).username,
            },
        ];
        for (const reaction of reactions) {
            const thought = getRandomItem(thoughts);
            thought.reactions.push({
                reactionBody: reaction.reactionBody,
                username: reaction.username,
            }); // Use `any` here to bypass strict type checking
            await thought.save();
        }
        console.log('Reactions added to thoughts.');
        // Set friendship logic
        const user1 = users.find((u) => u.username === 'user1');
        const user2 = users.find((u) => u.username === 'user2');
        const user3 = users.find((u) => u.username === 'user3');
        if (user1 && user2 && user3) {
            // user1 is friends with user2 and user3
            user1.friends.push(user2._id, user3._id);
            await user1.save();
            // user2 is friends with user1
            user2.friends.push(user1._id);
            await user2.save();
            // user3 has no friends
            console.log('Friendships set:');
            console.log(`user1 is friends with ${user1.friends.length} users.`);
            console.log(`user2 is friends with ${user2.friends.length} users.`);
            console.log(`user3 has ${user3.friends.length} friends.`);
        }
        console.log('Seeding complete! 🌱');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();
