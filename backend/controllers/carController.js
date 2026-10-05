const { where } = require("sequelize");
const db = require("../models")

module.exports = {
    getCarList:async(req,res)=>{
        try{
            const cars =  await db.cars.findAll()
            if(cars.length === 0){
                  return res.status(404).json({
                    success: false,
                    message: "Cars not found"
                });
            }

            console.log(cars,"carscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscarscars");
            
             return res.status(200).json({
                success: true,
                message: "cars found successfully",
                data: cars
            });

        }catch(err){
            console.log(err,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err.message
            });
        }
    },
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
}