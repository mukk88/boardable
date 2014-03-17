var mongoose = require('mongoose');

var connectionString = "mongodb://qwert:12345@oceanic.mongohq.com:10078/books";

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var bookSchema = mongoose.Schema({
	content:String,
	title:String,
	page:Number,
	children:[Number],
	version:Number
});

bookSchema.plugin(autoIncrement.plugin, { model: 'Book', startAt: 1 });

var Book = mongoose.model('Book', bookSchema);

exports.getBook = function(req,res){
	var url = req.url.split('/');
	var version = url.pop();
	var title = url.pop();
	console.log(version);
	Book.findOne({title:title, version:version}, function(err,book){
		if(!book){
			res.send('book not found');
		}else{
			res.render('book', {content:book.content, version:version});
		}
	});
};

exports.createBook = function(req, res){
	var title = req.body.title | 'placeholder title' + Math.random();
	var content = req.body.content | 'empty book';
	Book.findOne({title:title}, function(err, book){
		if(!book){
			var book = new Book();
			Book.nextCount(function(err,count){
				if(err) return;
				book.page = 1;
				book.title = title;
				book.content = content;
				book.children = [];
				book.version = count;
				book.save();
				res.send(count);
			})
		}else{
			res.send(false);
		}
	});
};

exports.updateBook = function(req,res){
	Book.findOne({title:"first"}, function(err, book){
		if(!book){
			res.send('error saving, please try again later');
		}else{
			book.content = req.body.content;
			console.log('saving book');
			book.version = 1;
			book.save();
			res.send('book saved ' + book.content);
		}
	});
};