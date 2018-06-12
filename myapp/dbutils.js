var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var employeeSchema = new mongoose.Schema({
	name : {type :String},
	email : {type :String},
	comp_id : {type:String},
	addr :{type:String},
	pin : {type:String},
});


var companySchema = new mongoose.Schema({
	_id : {type :String},
	name : {type:String},
});
	var employee = mongoose.model('employee',employeeSchema);
	var company = mongoose.model('company',companySchema);
	module.exports ={
		registerEmployee : function(req,callback){
			var data = new employee(req);
			data.save(function(err,res){
				if(err)
				{
					callback(1,null);
				}
				else
				{
					callback(0,res);
				}
			})
		},
		showEmployee:function(callback){
			employee.find({},function (err,res) {
				if(err)
					callback(1,null);
				else
					callback(0,res);
			})
		},
		addCompany:function (details,callback) {
			var data = new company(details);
			data.save(function (err,result) {
				if(err)
					callback(1,null);
				else
					callback(0,result);
			});
		},
		showCompany:function(callback){
			company.find({},function (err,res) {
				if(err)
					callback(1,null);
				else
					callback(0,res);
			})
		},
	}