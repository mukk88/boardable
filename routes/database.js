//password hash
var pwhash = require('password-hash');
exports.getHash = function(){return pwhash};

//mongo setup
var mongoose = require('mongoose');
var connectionString = "mongodb://woohoo:12345qwert@ds027759.mongolab.com:27759/boardables"; 
mongoose.connect(connectionString);
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

//user database
var userSchema = mongoose.Schema({
	pw:String,
	username:String
});

userSchema.plugin(autoIncrement.plugin, { model: 'User', startAt: 1 });
var User = mongoose.model('User', userSchema);

exports.getUserVar = function(){return User}; 

exports.createUser = function(req,res){
	User.findOne({username:req.body.username}, function(err,user){
		if(!user){
			var user = new User();
			User.nextCount(function(err,count){
				user.username = req.body.username;
				user.pw = pwhash.generate(req.body.password);
				user.save();
			});
			res.render('index',{title:'Boardable'});
		}else{
			res.send('username already exists, please try another one');
		}
	});
};

//game database
var gameSchema = mongoose.Schema({
	name:String,
	pw:String,
	creator:Number,
	state:{
		cards:[{user:Number,left:Number,top:Number,show:Boolean,z:Number,card:String}]
	},
	users:[Number]
});

gameSchema.plugin(autoIncrement.plugin, {model:'Game', startAt:1});
var Game = mongoose.model('Game', gameSchema);

exports.createGame = function(req,res){
	Game.findOne({name:req.body.name}, function(err,game){
		if(!game){
			var game = new Game();
			Game.nextCount(function(err,count){
				game.name = req.body.name;
				game.pw = pwhash.generate(req.body.password);
				game.creator = req.user;
				game.state = {cards:[]};
				game.users = [req.user];
				game.save();
			});
			res.send('This is a game board');
		}else{
			res.send('game with that name already exists, please try another one');
		}
	});
}

exports.joinGame = function(req,res){

}

exports.getAllGames = function(req,res){
	Game.find({}, function (err, games) {
		res.render('index',{title:'title',games:games});
  	});
}

exports.deleteGame = function(req,res){

}

//socketio

exports.setupIO= function(io){
	io.sockets.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
	  socket.on('my other event', function (data) {
	    console.log(data);
	  });
	});
}
