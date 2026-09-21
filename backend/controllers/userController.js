const db = require("../models")
// const helper= require("")
module.exports = {
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
}