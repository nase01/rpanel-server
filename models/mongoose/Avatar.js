import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema({
  adminId: {
    type: Number,
    required: [true, 'Admin Id is required.'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required.'],
  },
}, {
  collection: 'avatar',
  optimisticConcurrency: true,
  timestamps: true,
});

export const Avatar = mongoose.model('Avatar', avatarSchema);