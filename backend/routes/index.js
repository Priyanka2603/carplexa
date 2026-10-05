var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const carController = require('../controllers/carController')



///////////////////////////////////// users ////////////////////////////////////


router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.get('/getUserList',userController.getUserList)
router.get('/getUserProfile',userController.getUserProfile)

router.put('/updateUserStatus',userController.updateUserStatus)
router.put('/editProfile/:id',userController.editProfile)

router.delete("/deleteUser",userController.deleteUser)

////////////////////////////////////// cars ///////////////////////////////////

router.get('/getCarsList',carController.getCarList)
router.put('/updateCarStatus',carController.updateCarStatus)
router.delete("/deleteCar",carController.deleteCar)



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
