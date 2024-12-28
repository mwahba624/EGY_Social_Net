import { Schema, model, Types, Document } from 'mongoose';

// Interface for a single Reaction
export interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Interface for the Thought document
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[]; // Array of reactions
  reactionCount: number; // Virtual property
}

// Reaction schema
const reactionSchema = new Schema<IReaction>({
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
    get: (timestamp: Date | number | string) => new Date(timestamp).toLocaleString(),
  } as any, // Workaround for TypeScript error
}, {
  toJSON: {
    getters: true,
  },
  id: false,
  _id: false,
});

// Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (timestamp: Date | number | string) => new Date(timestamp).toLocaleString(),
    } as any, // Workaround for TypeScript error
    reactions: [reactionSchema],
    },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

// Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
