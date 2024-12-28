import { Schema, model, Types, Document } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[]; // Array of ObjectIds referencing "thought"
  friends: Types.ObjectId[]; // Array of ObjectIds referencing "user"
  friendCount: number; // Virtual property
}

// Define the User schema
const userSchema = new Schema<IUser>(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    id: false,
  }
);

// Virtual to calculate total count of friends
userSchema.virtual("friendCount").get(function (this: IUser) {
  return this.friends.length;
});

// Initialize the User model
const User = model<IUser>('User', userSchema);

export default User;
