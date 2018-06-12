var express = require('express');
let db = require('../dbutils');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/company',function (req,res,next) {
	db.showCompany(function(err,result){
		if(err)
			{console.log("error occured while showing companies");
		res.render('company');}
		else
			{
				res.render('company',{result : result});
			}
	});
});


router.post('/register',(req,res,next)=>{
	db.registerEmployee(req.body,(err,result)=>{
		if(err)
			console.log("error occured");
		else
			{console.log("item saved");
		res.send("item saved");}
	});
});


router.post('/company',(req,res,next)=>{
	db.addCompany(req.body,(err,result)=>{
		if(err)
			console.log("error occured");
		else
			{console.log("company details saved");
		res.redirect('/users/company');}
	});
});

router.get("/all",(req,res,next)=>{
	db.showEmployee(function(err,result){
		if(err)
			console.log("error occured while showing employees");
		else
			res.send(result);
	});
});

router.post('/vendor',(req,res,next)=>{
	db.addVendor(req.body,(err,result)=>{
		if(err)
			console.log("error occured");
		else
			{console.log("vendor details saved");
		res.redirect('/users/vendor');}
	});
});

router.get('/vendor',function (req,res,next) {
	db.showVendor(function(err,result){
		if(err)
			{console.log("error occured while showing vendor list");
		res.render('vendor');}
		else
			{
				res.render('vendor',{result : result});
			}
	});
});

module.exports = router;
