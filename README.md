#  17 Social Network API ![Static Badge](https://img.shields.io/badge/license-MIT-blue)

## Description 

This Social Network API is designed for a social networking platform where users can share thoughts, react to friends' thoughts, and create a friend list. Built with MongoDB, Express.js, and Mongoose, this API leverages NoSQL for handling large amounts of unstructured data efficiently.


## Table Contents
- [User Story](#user-story)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Feature](#feature)
- [Tests](#tests) 
- [Questions](#questions)
- [Credits](#credits)
- [Walkthrough Video](#walkthrough-video)
- [Deployed Link](#deployed-link)

## User Story 

AS A member of an agile team
I WANT a Kanban board with a secure login page
SO THAT I can securely access and manage my work tasks

## Installation
- Fork remote Repository and clone to Local
- npm install
- npm run build
- npm run seed
- npm run start 

## Usage
Use Insomnia or a similar tool to test the API endpoints. This application is not deployed, so all testing must be done locally.

### Users

#### GET `/api/users`
- Retrieves all users.

#### GET `/api/users/:userId`
- Retrieves a single user by their ID, including populated thought and friend data.

#### POST `/api/users`
- Creates a new user.
- Example Request Body:
  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

#### PUT `/api/users/:userId`
- Updates a user's details by their ID.

#### DELETE `/api/users/:userId`
- Deletes a user by their ID and removes their associated thoughts.

### Thoughts

#### GET `/api/thoughts`
- Retrieves all thoughts.

#### GET `/api/thoughts/:thoughtId`
- Retrieves a single thought by its ID.

#### POST `/api/thoughts`
- Creates a new thought and associates it with a user.
- Example Request Body:
  ```json
  {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```

#### PUT `/api/thoughts/:thoughtId`
- Updates a thought by its ID.

#### DELETE `/api/thoughts/:thoughtId`
- Deletes a thought by its ID.

### Friends

#### POST `/api/users/:userId/friends/:friendId`
- Adds a friend to a user's friend list.

#### DELETE `/api/users/:userId/friends/:friendId`
- Removes a friend from a user's friend list.

### Reactions

#### POST `/api/thoughts/:thoughtId/reactions`
- Adds a reaction to a thought.

#### DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`
- Removes a reaction by
 
## Feature
- User management: Create, update, delete, and fetch user details.
- Thought management: Share thoughts, edit, delete, and view thoughts.
- Friend list: Add and remove friends from a user's friend list.
- Reactions: Post and delete reactions to thoughts.
- Virtuals: Automatically calculate friend count and reaction count.
- Timestamp formatting: Properly formatted timestamps for all thoughts and reactions.

## License
[MIT License](https://opensource.org/license/mit)

## Tests
N/A

## Walkthrough Video
- [Video link](N/A)

## Deployed Link
- [Deployed Link](N/A)

## Questions
- [Github Profile](https://github.com/mwahba624/EGY_Social_Net)

## Credits
- N/A

