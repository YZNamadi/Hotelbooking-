const roomRouter = require("express").Router();
const {createRoom, changeRoomImage, deleteRoomImage} = require('../controllers/roomController')
const upload = require('../utils/multer')


/**
 * @swagger
 * /room/{id}:
 *   post:
 *     summary: Create a new room
 *     description: Allows an admin to create a new room and upload images. Authentication required.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category the room belongs to
 *         example: "67c9e9fe16af37fc64fc25f6"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 description: Name of the room
 *                 example: "Deluxe Suite"
 *               description:
 *                 type: string
 *                 description: Short description of the room
 *                 example: "Luxury room with a city view"
 *               price:
 *                 type: number
 *                 description: Price per night
 *                 example: 250
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 10 images of the room
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Room ID
 *                       example: "68a9b1de34cd78ef123abc45"
 *                     roomName:
 *                       type: string
 *                       description: Name of the room
 *                       example: "Deluxe Suite"
 *                     description:
 *                       type: string
 *                       description: Short description of the room
 *                       example: "Luxury room with a city view"
 *                     price:
 *                       type: number
 *                       description: Price per night
 *                       example: 250
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       description: URLs of uploaded images
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the room was created
 *                       example: "2025-03-06T18:31:26.298Z"
 *       400:
 *         description: Bad Request - Invalid Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Room name is required"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - User is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied. Admins only."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create room"
 */

roomRouter.post('/room/:id', upload.array('images', 10), createRoom);

// /**
//  * @swagger
//  * /room/{id}:
//  *   put:
//  *     summary: Update a room's details
//  *     description: Allows an admin to update a room's details such as name, description, and price. Authentication required.
//  *     tags:
//  *       - Rooms
//  *     security:
//  *       - bearerAuth: [] # Requires authentication
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the room to update
//  *         example: "605c72b1f1a3c619946b57da"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               roomName:
//  *                 type: string
//  *                 description: Updated name of the room
//  *                 example: "Executive Suite"
//  *               description:
//  *                 type: string
//  *                 description: Updated description of the room
//  *                 example: "A modern and luxurious executive suite"
//  *               price:
//  *                 type: number
//  *                 description: Updated price per night
//  *                 example: 350
//  *     responses:
//  *       200:
//  *         description: Room updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Room updated successfully"
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     _id:
//  *                       type: string
//  *                       description: Room ID
//  *                       example: "605c72b1f1a3c619946b57da"
//  *                     roomName:
//  *                       type: string
//  *                       description: Updated room name
//  *                       example: "Executive Suite"
//  *                     description:
//  *                       type: string
//  *                       description: Updated room description
//  *                       example: "A modern and luxurious executive suite"
//  *                     price:
//  *                       type: number
//  *                       description: Updated price per night
//  *                       example: 350
//  *       400:
//  *         description: Bad Request - Invalid Input
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Room name is required"
//  *       401:
//  *         description: Unauthorized - User is not authenticated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Authentication required"
//  *       403:
//  *         description: Forbidden - User is not an admin
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Access denied. Admins only."
//  *       404:
//  *         description: Not Found - Room not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Room not found"
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Failed to update room"
//  */

// roomRouter.put('/room/:id', updateRoomImage);


/**
 * @swagger
 * /room/{id}/{imageId}:
 *   put:
 *     summary: Change a room's image
 *     description: Allows an admin to update an image of a specific room. The old image will be deleted and replaced with a new one.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *         example: "605c72b1f1a3c619946b57da"
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The public_id of the image to be replaced
 *         example: "room_image_123"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file to upload
 *     responses:
 *       200:
 *         description: Room image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room image updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Room ID
 *                       example: "605c72b1f1a3c619946b57da"
 *                     roomName:
 *                       type: string
 *                       description: Name of the room
 *                       example: "Deluxe Suite"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           public_id:
 *                             type: string
 *                             description: Cloudinary public ID of the image
 *                             example: "new_room_image_456"
 *                           imageUrl:
 *                             type: string
 *                             format: uri
 *                             description: Secure URL of the uploaded image
 *                             example: "https://res.cloudinary.com/demo/image/upload/v1619551896/new_room_image_456.jpg"
 *       400:
 *         description: Bad Request - Invalid Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No image file provided"
 *       404:
 *         description: Not Found - Room or Image Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room Not Found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: Failed to update image"
 */


// roomRouter.patch('/room/:id', upload.single('image'), changeRoomImage);
roomRouter.put('/room/:id/:imageId', upload.single('image'), changeRoomImage);

/**
 * @swagger
 * /room/{id}/{imageId}:
 *   delete:
 *     summary: Delete a room image
 *     description: Allows an admin to delete a specific image from a room. The image will also be removed from Cloudinary.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *         example: "605c72b1f1a3c619946b57da"
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The public_id of the image to be deleted from Cloudinary
 *         example: "room_image_123"
 *     responses:
 *       200:
 *         description: Room image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room image deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Room ID
 *                       example: "605c72b1f1a3c619946b57da"
 *                     roomName:
 *                       type: string
 *                       description: Name of the room
 *                       example: "Deluxe Suite"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           public_id:
 *                             type: string
 *                             description: Cloudinary public ID of the remaining images
 *                             example: "room_image_456"
 *                           imageUrl:
 *                             type: string
 *                             format: uri
 *                             description: Secure URL of the remaining images
 *                             example: "https://res.cloudinary.com/demo/image/upload/v1619551896/room_image_456.jpg"
 *       400:
 *         description: Bad Request - Invalid Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid room ID"
 *       404:
 *         description: Not Found - Room or Image Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image Not Found in this Room"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error: Failed to delete image"
 */


roomRouter.delete('/room/:id/:imageId', deleteRoomImage);


module.exports = roomRouter


