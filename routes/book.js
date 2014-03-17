var mongoose = require('mongoose');

var connectionString = "mongodb://qwert:12345@oceanic.mongohq.com:10078/books";

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var bookSchema = mongoose.Schema({
	content:String,
	title:String,
	page:Number,
});

bookSchema.plugin(autoIncrement.plugin, { model: 'Book', startAt: 1 });

var Book = mongoose.model('Book', bookSchema);

exports.getBook = function(req,res){
	Book.findOne({title:'first'}, function(err,book){
		if(!book){
			res.send('book not found');
		}else{
			console.log('!!!!!' + book);
			res.render('book', {content:book.content});
		}
	});
};

exports.createBook = function(req, res){
	Book.findOne({title:"first"}, function(err, book){
		if(!book){
			var book = new Book();
			Book.nextCount(function(err,count){
				if(err) return;
				book.page = 1;
				book.title = "first";
				book.content = "hi this is a book.\nwith 2 lines.";
				book.save();
				res.send(book.content);
			})
		}else{
			res.send('title already exists, please try another');
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
			book.save();
			res.send('book saved ' + book.content);
		}
	});
};
