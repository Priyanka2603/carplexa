var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const carController = require('../controllers/carController')
const adminController = require('../controllers/adminController')
const adminAuth = require('../middleware/adminAuth')



///////////////////////////////////// users ////////////////////////////////////


router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.get('/getUserList',userController.getUserList)
router.get('/getUserProfile',userController.getUserProfile)

router.put('/updateUserStatus',userController.updateUserStatus)
router.put('/editProfile/:id',userController.editProfile)

router.delete("/deleteUser",userController.deleteUser)

////////////////////////////////////// cars ///////////////////////////////////

router.post('/addCar',carController.addCar)
router.post('/addCarImage/:carId',carController.addCarImage)
router.get('/getCarList',carController.getCarList)
router.put('/updateCarStatus',carController.updateCarStatus)
router.delete("/deleteCar",carController.deleteCar)


///////////////////////////////////// brand ///////////////////////////////////
router.post('/brandlist',carController.brandlist)
router.get('/getBrandList',carController.getBrandList)
router.put('/updateBrandStatus',carController.updateBrandStatus)
router.delete('/deleteBrand',carController.deleteBrand)

//////////////////////////////////// admin /////////////////////////////////////

router.use('/admin', adminAuth)
router.get('/admin/overview', adminController.getOverview)
router.get('/admin/:resource', adminController.list)
router.post('/admin/brands', adminController.createBrand)
router.post('/admin/faqs', adminController.createFaq)
router.patch('/admin/:resource/:id', adminController.update)
router.delete('/admin/:resource/:id', adminController.remove)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
