
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.user);
	res.render('index', { title: 'Boardable' });
};

exports.login = function(req,res){
	res.render('login',{title:'Boardable'});
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

exports.game = function(req,res){
	//call this function in another function to pass in other parameters
	res.send("this is the game board")
}

exports.hand = function(req,res){
	//use req.user to get the id of the user who is logged in
	res.send("this is a users hand")
}
