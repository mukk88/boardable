
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