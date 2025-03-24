const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Trims whitespace
        },
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room', // Ensure this matches your Room model name
            }
        ],
        amenities: {
            type: [String],
            default: [], // Ensures an empty array if no amenities are provided
        },
        createdBy: {
            adminId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Ensure this matches your User model name
                required: true,
            },
            adminName: {
                type: String,
                trim: true,
            },
        }
    },
    { timestamps: true } // Enables automatic createdAt and updatedAt fields
);

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
