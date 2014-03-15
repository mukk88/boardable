
/*
 * GET home page.
 */
exports.index = function(req,res){
	res.render('index', { title: 'Boardable', games:false});
}

exports.login = function(req,res){
	res.render('login',{title:'Boardable'});
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

exports.connect4 = function(req,res){
	res.render('fun');
}
