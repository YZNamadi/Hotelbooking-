const categoryModel = require('../models/category')
const userModel = require('../models/user')

exports.createCategory = async(req, res) =>{
    try{
        //Extract the User ID fom the req.body object
        const {userId} = req.user;
        //Find user and check if it still exists
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // Extract category details from req.body
        const { name, amenities } = req.body;
        if (!name || !amenities) {
            return res.status(400).json({ message: "Name and amenities are required" });
        }


        const category = new categoryModel({
            name,
            amenities,
            createdBy: {
                adminId: userId,
                adminName: user.fullName
            }
        });

        await category.save(

        
        res.status(200).json({
            message: 'Category Created Successfully',
            data: category
        })
        )

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await categoryModel.find().populate('rooms', ['roomName', 'description', 'price']);  
        
        res.status(200).json({
            message: "Categories fetched successfully",
            data: rooms
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};