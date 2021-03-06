//password hash
var pwhash = require('password-hash');
exports.getHash = function(){return pwhash};

//mongo setup
var mongoose = require('mongoose');
// var connectionString = "mongodb://woohoo:12345qwert@ds027759.mongolab.com:27759/boardables"; 
var connectionString = "mongodb://woohoo:qwert12345@widmore.mongohq.com:10000/Boardable";
var options = {
    server:{
        auto_reconnect: true,
        poolSize: 10,
        socketOptions:{
            keepAlive: 1
        }
    },
    replset: { rs_name: 'myReplicaSetName', socketOptions:{keepAlive:1} },
    db: {
        numberOfRetries: 10,
        retryMiliSeconds: 1000
    }
}
mongoose.connect(connectionString, function(err) {
    if(err) console.log('MongoDB: connection error -> ' + err);
    else console.log('MongoDB: successfully connected');
});
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString, options);
connection.on('error', function(err) {
    console.log("DB connection Error: "+err);
});
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
				if(err) return; 
				user.username = req.body.username;
				user.pw = pwhash.generate(req.body.password);
				user.save();
			});
			Game.find({}, function (err, games) {
				res.render('index',{title:'Boardable', games:games});
			});
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
	table:String,
	users:[{
		userid:Number,
		socketid:String
	}]
});

gameSchema.plugin(autoIncrement.plugin, {model:'Game', startAt:1});
var Game = mongoose.model('Game', gameSchema);

exports.createGame = function(req,res){
	Game.findOne({name:req.body.name}, function(err,game){
		if(!game){
			var gid;
			Game.nextCount(function(err, count) {
				gid = count;
				res.render('board', {gameid:gid, port:port});
			});
			var g = new Game();
			Game.nextCount(function(err,count){
				if(err) return;
				g.name = req.body.name;
				g.pw = pwhash.generate(req.body.password);
				g.creator = req.user;
				g.state = {cards:[]};
				g.users = [];
				g.table = 0;
				g.save();
			});
		}else{
			res.send('game with that name already exists, please try another one');
		}
	});
}

exports.joinGame = function(req,res){
	var uid = req.user;
	var url = req.url.split('/');
	url.pop();
	var gid = url.pop();
	res.render('hand', {userid:uid,gameid:gid, port:port});
	// get all cards from the database and send them too
}

exports.viewGame = function(req,res){
	var gid = req.url.split('/').pop();
	res.render('board',{gameid:gid, port:port});
	// get all cards for table and send them
}

exports.getAllGames = function(req,res){
	Game.find({}, function (err, games) {
		if(err) return;
		res.render('index',{title:'title',games:games});
  	});
}

exports.deleteGame = function(req,res){

}

//socketio
var port;
exports.setPort = function(p){
	port = p;
}

exports.setupIO= function(io){

	io.sockets.on('connection', function (socket) {

	  socket.emit('welcome', { game:'bridge'});

	  socket.on('table', function (data) {
	    console.log(data.gameid);
	    console.log('socket' + socket.id)
	  	Game.findOne({_id:data.gameid}, function (err,game) {
	  		game.table = socket.id;
	  		game.save();
	  	});
	  });

	  socket.on('hand', function(data){
	  	console.log(data);
	    console.log('socket' + socket.id)
	    try{
		    Game.findOne({_id:data.gameid}, function (err,game) {
		    	if(err) {
	    			console.log('MongoDB: connection error -> ' + err);
	    			return;
	    		}
		    	var existing = false;
		    	for(var i=0;i<game.users.length;i++){
		    		if(game.users[i].userid==data.userid){
		    			game.users[i].socketid = socket.id;
		    			existing = true;
		    		}
		    	}
		    	if(!existing){
			  		game.users.push({
			  			userid:data.userid,
			  			socketid:socket.id
			  		})
		    	}
		  		game.save();
		  		// should also tell table someone joined
		  	});
	    }catch(error){
	    	console.log('take' + error);
	    }
	  });

	  socket.on('give', function(data){
	  	console.log(data);
	  	try{
		  	Game.findOne({_id:data.gameid}, function (err,game) {
	    		if(err) {
	    			console.log('MongoDB: connection error -> ' + err);
	    			return;
	    		}
		    	if(data.to){
		    		var socket;
		    		for(var i=0;i<game.users.length;i++){
		    			if(game.users[i].userid == data.to){
		    				socket = game.users[i].socketid;
		    			}
		    		}
		    		io.sockets.socket(socket).emit('take',{});
		    		//throw error if cannot find
		    	}else{
		    		var socket = game.table;
		    		io.sockets.socket(socket).emit('take',{});
		    	}
		    });
	  	}catch(error){
	  		console.log('give' + error);
	  	}
	  	// need to know from who,to who and card details
	  	// update database
	  	// send to specific socket io.sockets.socket(socketId).emit(...)
	  	//
	  });

	  socket.on('disconnect', function(){
	  	console.log("dc " + socket.id);
	  	//how to tell which game it is from? iterate all games
	  	//remove the socket id from the database, decrement user list if is user
	  });

	});
}
