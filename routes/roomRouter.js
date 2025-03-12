const roomRouter = require("express").Router();
const {createRoom, changeRoomImage, deleteRoomImage} = require('../controllers/roomController')
const upload = require('../utils/multer')

roomRouter.post('/room/:id', upload.array('images', 10), createRoom);
roomRouter.put('/room/:id/:imageId', upload.single('image'), updateRoomImage);
roomRouter.delete('/room/:id/:imageId', deleteRoomImage);

module.exports = roomRouter
