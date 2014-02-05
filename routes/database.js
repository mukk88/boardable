var mongoose = require('mongoose');
var connectionString = "mongodb://woohoo:12345qwert@ds027759.mongolab.com:27759/boardables"; 
mongoose.connect(connectionString);

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var userSchema = mongoose.Schema({
	pw:String,
	username:String
});

var pwhash = require('password-hash');

userSchema.plugin(autoIncrement.plugin, { model: 'User', startAt: 1 });
var User = mongoose.model('User', userSchema);

exports.getUserVar = function(){ return User}; 

exports.postCreate = function(req,res){
	var user = new User();
	console.log(req.body.username);
	User.nextCount(function(err,count){
		user.username = req.body.username;
		user.pw = pwhash.generate(req.body.password);
		user.save();
	});
	res.render('index',{title:'Boardable'});
};

