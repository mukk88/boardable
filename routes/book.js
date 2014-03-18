var mongoose = require('mongoose');

var connectionString = "mongodb://qwert:12345@oceanic.mongohq.com:10078/books";

mongoose.connect(connectionString);

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var bookSchema = mongoose.Schema({
	content:String,
	title:String,
	page:Number,
	children:[{version:Number,
		line:Number}],
	version:Number,
	fixed:String
});

bookSchema.plugin(autoIncrement.plugin, { model: 'Book', startAt: 1 });

var Book = mongoose.model('Book', bookSchema);

exports.getBook = function(req,res){
	var url = req.url.split('/');
	var version = parseInt(url.pop());
	var title = url.pop().replace(/%20/g,' ');;
	Book.findOne({title:title, version:version}, function(err,book){
		if(!book){
			res.send('book not found');
		}else{
			res.render('book', {content:book.content, version:version, title:title, fixed:book.fixed});
		}
	});
};

exports.createBook = function(req, res){
	var title = req.body.title;
	var content = req.body.content;
	var fork = parseInt(req.body.fork);
	var line = parseInt(req.body.line);
	console.log(title + ' ' + content + '  ' + fork);

	if(fork){
		Book.find({title:title}, function(err, books){
			if(books){
				//book exists, fork it
				var version = 0;
				console.log(books)
				for (var i=0;i<books.length;i++){
					console.log(books[i].version);
					if(parseInt(books[i].version)>version){
						version=parseInt(books[i].version);
					}
				}
				version++;
				var next = 0;

				Book.nextCount(function(err, count){
					if(err) return;
					var newbook = new Book();
					newbook.page = 1;
					newbook.title = title;
					newbook.content = '\nstart editing here';
					newbook.children = [];
					newbook.version = version;
					newbook.fixed = content;
					newbook.save();
					next = count;
					res.send(String(version));
				});
				//update the children on the parent.
				Book.findOne({title:title,version:version}, function(err,book){
					if(err) return;
					book.children = book.children.push({
						version:next,
						line:line
					});
					book.save();
				});
			}else{
				res.send('fork failed' + false);
			}
		});
	}else{
		Book.findOne({title:title}, function(err, book){
			if(!book){
				var book = new Book();
				Book.nextCount(function(err,count){
					if(err) return;
					book.page = 1;
					book.title = title;
					book.content = content;
					book.children = [];
					book.version = 1;
					book.fixed = '';
					book.save();
					res.send('1');
				});
			}else{
				//book of that title already exists
				res.send(false);
			}
		});
	}
};

exports.updateBook = function(req,res){
	var title = req.body.title;
	var version = parseInt(req.body.version);
	Book.findOne({title:title,version:version}, function(err, book){
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
