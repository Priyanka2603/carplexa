var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')




router.get('/getUserList',userController.getUserList)
router.put('/updateUserStatus',userController.updateUserStatus)
router.delete("/deleteUser",userController.deleteUser)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
