require("dotenv").config();
const fs = require("fs");
const roomModel = require("../models/rooms");
const cloudinary = require("../config/cloudinary");
const categoryModel = require("../models/category");

exports.createRoom = async (req, res) => {
    try {
        const { id: categoryId } = req.params;
        const { roomName, price, description, roomNumber } = req.body;

        // Check if category exists
        const categoryExists = await categoryModel.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        // Upload images to Cloudinary
        const imageArray = [];
        for (const image of req.files) {
            const result = await cloudinary.uploader.upload(image.path);

            // Delete local file after upload
            fs.unlinkSync(image.path);

            imageArray.push({
                imageUrl: result.secure_url,
                public_id: result.public_id
            });
        }

        // Create room
        const room = new roomModel({
            category: categoryId,
            roomName,
            roomNumber,
            price,
            description,
            images: imageArray
        });

        // Link room to category
        categoryExists.rooms.push(room._id);
        await categoryExists.save();
        await room.save();

        res.status(201).json({ message: "Room created successfully", data: room });
    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.changeRoomImage = async (req, res) => {
    try {
        const { id, imageId } = req.params;

        // Find the room
        const roomExists = await roomModel.findById(id);
        if (!roomExists) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Find the image in the room's images array
        const imageIndex = roomExists.images.findIndex(img => img.public_id === imageId);
        if (imageIndex === -1) {
            return res.status(404).json({ message: "Image not found in this room" });
        }

        // Delete the old image from Cloudinary
        await cloudinary.uploader.destroy(imageId);

        // Upload new image to Cloudinary
        const cloudImage = await cloudinary.uploader.upload(req.file.path);

        // Update the image details in the array
        roomExists.images[imageIndex] = {
            public_id: cloudImage.public_id,
            imageUrl: cloudImage.secure_url
        };

        await roomExists.save();

        // Delete local file after upload
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        res.status(200).json({ message: "Room image updated successfully", data: roomExists });
    } catch (error) {
        console.error("Error updating room image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




exports.deleteRoomImage = async (req, res) => {
    try {
        const { id, imageId } = req.params;

        // Find the room
        const roomExists = await roomModel.findById(id);
        if (!roomExists) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Find the image in the room's images array
        const imageIndex = roomExists.images.findIndex(img => img.public_id === imageId);
        if (imageIndex === -1) {
            return res.status(404).json({ message: "Image not found in this room" });
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(imageId);

        // Remove image from the room's images array
        roomExists.images.splice(imageIndex, 1);
        await roomExists.save();

        res.status(200).json({ message: "Room image deleted successfully", data: roomExists });
    } catch (error) {
        console.error("Error deleting room image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
