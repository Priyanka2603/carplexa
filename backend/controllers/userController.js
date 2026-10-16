const { where } = require("sequelize");
const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// const helper= require("")
module.exports = {
   signUp: async (req, res) => {
    try {
        // Check if email already exists
        const user = await db.users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hash = await bcrypt.hash(req.body.password, 10);

        // Profile image
        let imageName = null;

        if (req.files && req.files.profile_image) {
            const profileImage = req.files.profile_image;
            imageName = Date.now() + "_" + profileImage.name;
            await profileImage.mv("./uploads/" + imageName);
        }

        // Create user
        const createUser = await db.users.create({
            email: req.body.email,
            password: hash,
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            profile_image: imageName,
            role: req.body.role === "dealer" ? "dealer" : "user",
            dealer_logo: req.body.dealer_logo,
            dealer_cover_image: req.body.dealer_cover_image,
            dealership_name: req.body.dealership_name,
            phone: req.body.phone,
            business_registration_number: req.body.business_registration_number,
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            about: req.body.about,
            login_time: req.body.login_time,
            device_type: req.body.device_type,
            device_token: req.body.device_token,
            socket_id: req.body.socket_id,
            social_id: req.body.social_id,
            social_type: req.body.social_type,
            forget_hash: req.body.forget_hash,
            forget_hash_expiry: req.body.forget_hash_expiry,
            // New users can be active by default
            status: req.body.status || "active"
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: createUser
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
},
    login: async(req,res)=>{
        try{
        if (typeof req.body.email !== "string" || !req.body.email.trim() || typeof req.body.password !== "string" || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await db.users.findOne({where:{email:req.body.email}})
      
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                });

            }
            if(user.role !== "admin"){
                 return res.status(404).json({
                    success: false,
                    message: "Only admin can login"
                });
            }
            if (user.status !== "active") {
                return res.status(403).json({
                    success: false,
                    message: "This administrator account is inactive"
                });
            }

            const passwordMatches = user.password && await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong password! Try again"
                });
            }

            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET must be configured before administrators can sign in");
                return res.status(500).json({
                    success: false,
                    message: "Server authentication is not configured"
                });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
            return res.status(200).json({
                success: true,
                message: "login successfully",
                token,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }
            });
        }catch(err){
            console.error("Administrator login failed", err);
            return res.status(500).json({
                success: false,
                message: "Unable to sign in"
            });
        }

    },
    getUserList: async (req, res) => {
        try {
            const users = await db.users.findAll();

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Users not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Users found successfully",
                data: users
            });

        } catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },
    getUserProfile: async (req, res) => {
        try{


            console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
            
            const user = await db.users.findOne({where:{id: req.query.id},raw:true});
             if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Users not found"
                });
            }

            return res.status(200).json({
                    success: true,
                    message: "user found successfully",
                    user:user
                });
            

        }catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },
    updateUserStatus: async (req, res) => {
        try {

            var finalStatus = ''
            if (req.body.status == 1) {
                finalStatus = "active"

            }
            if (req.body.status == 2) {
                finalStatus = "inactive"
            }
            const updateStatus = await db.users.update({ status: finalStatus }, { where: { id: req.body.id } })


            if ((updateStatus[0] === 0)) {
                return res.status(404).json({
                    success: false,
                    message: "user not found or updated successfully",


                });

            }
            return res.status(200).json({
                success: true,
                message: "status updated successfully",
                data: updateStatus
            });

        } catch (err) {
            console.log(err)

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message

            });

        }
    },
     deleteUser: async (req, res) => {
        try {
            const user = await db.users.findOne({ where: { id: req.body.id } });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Users not found"
                });
            }

            const removeUser = await db.users.destroy({ where: { id: req.body.id } })
            if (removeUser) {
                return res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                });
            }



        } catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },
    editProfile: async (req, res) => {
    try {

        const user = await db.users.findOne({
            where: { id: req.params.id }
        });
        console.log(user,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!req.files || !req.files.profile_image) {
            return res.status(400).json({
                success: false,
                message: "Image required"
            });
        }

        const profileImage = req.files.profile_image;

        // Create unique image name
        const imageName = Date.now() + "_" + profileImage.name;

        // Save actual image inside uploads folder
        await profileImage.mv("./uploads/" + imageName);

        // Save only image name in database
        const editUser = await db.users.update(
            {
                profile_image: imageName
            },
            {
                where: { id: req.params.id }
            }
        );

        if (editUser[0] > 0) {
            return res.status(200).json({
                success: true,
                message: "User profile updated successfully",
                data: {
                    profile_image: imageName
                }
            });
        }

        return res.status(400).json({
            success: false,
            message: "Profile image was not updated"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
},
}