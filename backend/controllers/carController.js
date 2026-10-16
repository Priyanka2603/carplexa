const { where } = require("sequelize");
const db = require("../models")

const cars = db.cars;
 
  cars.hasMany(db.car_images, {
  as: "car_images",
  foreignKey: "car_id"
})
module.exports = {
 addCar: async (req, res) => {
        try {
            const {
                user_id,
                vin,
                vehicle_year,
                vehicle_make,
                vehicle_model,
                vehicle_trim,
                vehicle_body,
                engine,
                vehicle_doors,
                vehicle_type,
                clean_title,
                condition,
                service_history,
                previous_owners,
                fuel_type,
                transmission,
                drive_type,
                asking_price,
                description,
                status
            } = req.body;

            // Validate required fields
            if (
                !user_id ||
                !vin ||
                !vehicle_year ||
                !vehicle_make ||
                !vehicle_model ||
                asking_price === undefined ||
                asking_price === null ||
                asking_price === ""
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide user_id, VIN, year, make, model and asking price"
                });
            }

            // Insert car data
            const car = await db.cars.create({
                user_id,
                vin,
                vehicle_year,
                vehicle_make,
                vehicle_model,
                vehicle_trim,
                vehicle_body,
                engine,
                vehicle_doors,
                vehicle_type,
                clean_title,
                condition,
                service_history,
                previous_owners,
                fuel_type,
                transmission,
                drive_type,
                asking_price,
                description,
                status: status || "available"
            });

            console.log(car, "car added successfully");

            return res.status(201).json({
                success: true,
                message: "Car added successfully",
                data: car
            });

        } catch (err) {
            console.log(err, "Error while adding car");

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },

    
    

addCarImage: async (req, res) => {
    try {
        // Check whether image is uploaded
        if (!req.files || !req.files.car_image) {
            console.log(req.files, "Request files for addCarImage");
            return res.status(400).json({
                success: false,
                message: "Image required"
            });
        }

        const carImage = req.files.car_image;
        const carId = req.params.carId;

        // Check whether car exists
        const car = await db.cars.findByPk(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        // Create unique image name
        const imageName = Date.now() + "_" + carImage.name;

        // Save actual image inside uploads folder
        await carImage.mv("./uploads/" + imageName);

        // Save image details in car_images table
        const image = await db.car_images.create({
            car_id: carId,
            image_url: imageName,
            sort_order: 0,
            
        });

        return res.status(201).json({
            success: true,
            message: "Car image added successfully",
            data: image
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



    getCarList: async (req, res) => {
        try {
            console.log(req.body, "Request body for getCarList","kkkkkkkkkkkkkkkkkkkkkk");
           const cars = await db.cars.findAll({
  attributes: ["id", "vehicle_make", "vehicle_model"],
  include: [
    {
      model: db.car_images,
      as: "car_images"
    }
  ]
});

            if (cars.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Cars not found"
                });
            }

            console.log(cars, "cars");

            return res.status(200).json({
                success: true,
                message: "cars found successfully",
                data: cars
            });

        } catch (err) {
            console.log(err, "Error while fetching cars");

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },

    
    // getCarList:async(req,res)=>{
    //     try{
    //         const cars =  await db.cars.findAll()
    //         if(cars.length === 0){
    //               return res.status(404).json({
    //                 success: false,
    //                 message: "Cars not found"
    //             });
    //         }

    //         console.log(cars,"carscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscars");
            
    //          return res.status(200).json({
    //             success: true,
    //             message: "cars found successfully",
    //             data: cars
    //         });

    //     }catch(err){
    //         console.log(err,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

    //         return res.status(500).json({
    //             success: false,
    //             message: "Something went wrong",
    //             error: err.message
    //         });
    //     }
    // },
      updateCarStatus: async (req, res) => {
            try {
                console.log(req.body,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    
                var finalStatus = ''
                if (req.body.status == 1) {
                    finalStatus = "active"
    
                }
                if (req.body.status == 2) {
                    finalStatus = "inactive"
                }
                const updateStatus = await db.cars.update({ status: finalStatus }, { where: { id: req.body.id } })
    
    
                if ((updateStatus[0] === 0)) {
                    return res.status(404).json({
                        success: false,
                        message: "cars not found or updated successfully",
    
    
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

//            updateCarStatus: async (req, res) => {
//     try {
//         // Step 1: Get car ID from the URL
//         const { id } = req.params;

//         // Step 2: Get new status from request body
//         const { status } = req.body;

//         // Step 3: Check whether status is valid
//         if (!["active", "inactive"].includes(status)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Status must be active or inactive"
//             });
//         }

//         // Step 4: Find the car in the database
//         const car = await db.cars.findByPk(id);

//         // Step 5: Check whether the car exists
//         if (!car) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Car not found"
//             });
//         }

//         // Step 6: Update the car's status
//         await car.update({
//             status: status
//         });

//         // Step 7: Send a success response
//         return res.status(200).json({
//             success: true,
//             message: "Car status updated successfully",
//             data: {
//                 id: car.id,
//                 status: car.status
//             }
//         });

//     } catch (err) {
//         // Step 8: Handle unexpected errors
//         console.error(err);

//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong"
//         });
//     }
// },
         deleteCar: async (req, res) => {
                try {
                    const car = await db.cars.findOne({ where: { id: req.body.id } });
        
                    if (!car) {
                        return res.status(404).json({
                            success: false,
                            message: "car not found"
                        });
                    }
        
                    const removeCar = await db.cars.destroy({ where: { id: req.body.id } })
                    if (removeCar) {
                        return res.status(200).json({
                            success: true,
                            message: "car deleted successfully",
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




            /////////////////////////////////Car Brand////////////////////////////////////

            brandlist:async(req,res)=>{
                try{
                    if(!req.body.name || !req.body.slug || !req.files.logo || !req.body.description ){
                        return res.status(400).json({
                            success: false,
                            message: "All fields are required"
                        });
                    }

                    const logo = req.files.logo;
                    const logoName = Date.now() + "_" + logo.name;
                    await logo.mv("./uploads/" + logoName);
                    const brand = await db.brands.create({
                        name:req.body.name,
                        slug:req.body.slug,
                        logo:logoName,
                        description:req.body.description
                    })
                    return res.status(201).json({
                        success:true,
                        message:"Brand added successfully",
                        data:brand
                    })

                }catch(err){
                    console.log(err);
                    return res.status(500).json({
                        success:false,
                        message:"Something went wrong",
                        error:err.message
                    })
                }
            },
            getBrandList:async(req,res)=>{
                try{
                    const brand = await db.brands.findAll()
                    if(brand.length === 0){
                        return res.status(404).json({
                            success:false,
                            message:"Brands not found"
                        })
                    }
                    return res.status(200).json({
                        success:true,
                        message:"Brands found",
                        data:brand
                    })
                }catch(err){
                    console.log(err);
                    return res.status(500).json({
                        success:false,
                        message:"Something went wrong",
                        error:err.message
                    })
                }
            },

updateBrandStatus: async (req, res) => {
    try {

        const { id,status } = req.body;

        // Validate status
        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be active or inactive"
            });
        }

        // Find brand by ID
        const brand = await db.brands.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found"
            });
        }

        // Update brand status in MySQL
        await brand.update({
            status: status
        });

        return res.status(200).json({
            success: true,
            message: "Brand status updated successfully",
            data: brand
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
},
deleteBrand: async (req, res) => {
    try {
        const { id } = req.body;
        const brand = await db.brands.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found"
            });
        }
        await brand.destroy();
        return res.status(200).json({
            success: true,
            message: "Brand deleted successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
}