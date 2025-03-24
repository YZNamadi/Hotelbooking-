const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
            trim: true, // Removes unwanted spaces
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensures price cannot be negative
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        roomNumber: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                imageId: {
                    type: mongoose.Schema.Types.ObjectId, // Use ObjectId if image references another collection
                    required: true,
                },
                imageUrl: {
                    type: String,
                    required: true,
                    trim: true,
                },
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', // Ensure it matches the correct Category model name
            required: true,
        },
    },
    { timestamps: true }
);

const roomModel = mongoose.model('Room', roomSchema);

module.exports = roomModel;
