$(document).ready(function(){
	for(var i=0;i<g.length;i++){
		var game = $('<div class="game">');
		game.append('<span>' + g[i].name + '</span>')
		var view = "window.location.href='/game/" + g[i]._id + "'";
		var join = "window.location.href='/game/" + g[i]._id + "/user'";
		game.append('<button onclick="' + view +'" >table</button>');
		game.append('<button onclick="' + join + '" >hand</a>');
		$('.games').append(game);
	}
});