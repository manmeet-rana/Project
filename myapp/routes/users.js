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

router.post('/pay',function(req,res,next){
	user_balance = req.body.balance;
	debit_amt = req.body.debit_amt;
	if(user_balance>debit_amt)
	{
		db.newTransaction(req.body,(err,result)=>{
		if(err)
			{console.log(err);
				res.end();}
		else
		{
			let amt=user_balance-debit_amt;
			var data={
				debit_amt : amt,
				id : req.body.emp_id,
			};
			db.updateBalance(data,(err,response)=>{
				if(err)
				{
					console.log("Employee balance not updated");
					res.end();
					//we can delete the corresponding transaction and revert back the changes
				}
				else
				{
					res.send("Paid to vendor and employee balance updated");
				}
			});
		}
	});
	}
	else
	{
		res.send("Low balance cant pay now");
	}
});

router.get('/login',(req,res)=>{
	res.render('login',{message:""});
});

router.post('/profile',(req,res,next)=>{
	db.checkLogin(req.body,(err,result)=>{
		if(err)
		{
			console.log(err);
			req.flash('fail','failed to login due to server error');
			res.render('login',{message : req.flash('fail')});
		}
		else
		{
			if(result)
			{
				db.showVendor((err,vendor)=>{
					if(err)
					{
						console.log(err);
						res.render('profile',{user:result});
					}
					else
					{
						let query={
				          id:result._id,
			            };
			            console.log("query : "+query);
			 			
						db.showTransaction(query,(err,transaction)=>{
							if(err)
							{
								console.log(err);
								res.render('profile',{user:result , vendor : vendor});
							}
							else
							{
								res.render('profile',{user:result , vendor : vendor,transaction:transaction});
							}
						});
					}
				})
			}
			else
			{
				req.flash('login','Invalid credentials try again!');
				res.render('login',{message : req.flash('login') });
			}
		}
	});
})

module.exports = router;
