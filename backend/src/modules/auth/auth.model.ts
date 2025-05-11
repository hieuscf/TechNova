import mongoose, { Schema, Types } from "mongoose";

// Interface cho FriendRequest
interface IFriendRequest {
    userId: Types.ObjectId;
    status: 'pending' | 'accepted' | 'rejected';
    sentAt: Date;
  }
  
  // Interface cho Notifications
  interface INotifications {
    email: boolean;
    push: boolean;
    marketing: boolean;
  }
  
  // Interface chính của User
  export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatar?: string;
    coverPhoto?: string;
    bio?: string;
    location?: string;
    website?: string;
    phoneNumber?: string;
    birthDate?: Date;
    gender?: "male" | "female";
    isVerified: boolean;
    isActive: boolean;
    role: "user" | "admin" | "merchant";
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    friendRequests: IFriendRequest[];
    notifications: INotifications;
    storeId?: Types.ObjectId;
  }
  
  const UserSchema: Schema = new Schema<IUser>(
    {
      username: { type: String, required: true, unique: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      avatar: { type: String },
      coverPhoto: { type: String },
      bio: { type: String },
      location: { type: String },
      website: { type: String },
      phoneNumber: { type: String },
      birthDate: { type: Date },
      gender: {
        type: String,
        enum: ['male', 'female'],
      },
      isVerified: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
      role: {
        type: String,
        enum: ['user', 'admin', 'merchant'],
        default: 'user',
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      lastLogin: { type: Date },
  
      followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
      friendRequests: [
        {
          userId: { type: Schema.Types.ObjectId, ref: 'User' },
          status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
          },
          sentAt: { type: Date, default: Date.now },
        },
      ],
  
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false },
      },
  
      storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
    },
    {
      timestamps: true, // Tự động tạo createdAt và updatedAt
    }
  );
  
  export default mongoose.model<IUser>('User', UserSchema);
