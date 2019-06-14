var express = require('express');
var router = express.Router();

router.index = function(req, res){
	var msgAlert="";
	res.render('index', { title: 'RapidMiner Server',msgAlert:msgAlert});
};
/* GET home page. */
router.about = function(req, res){
  res.render('about', { title: 'RapidMiner Server' });
};
router.courses = function(req, res){
  res.render('courses', { title: 'RapidMiner Server' });
};
module.exports = router;
