$(document).ready(function() {
	var cur = 0;
	var me = false;
	var over = false;

	var tokens = [];
	for(var r =0;r<8;r++){
		tokens[r] = [];
	}

	var moves = [];
	var directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,1],[1,0],[1,-1]];
	
	function makeToken(id, color, left, bottom, absolute){
		var token = $('<div class="token '+color+'" id = "' +id + '">');
		token.css('left',left);
		if(bottom)	token.css('bottom',bottom);
		if(absolute) token.css('position','absolute');
		return token;
	}

	function newtile(){
		$('#temp').remove();
		$('#ghost').remove();
		var left = cur*64+4;
		var len = tokens[cur].length,
			bottom = len*64+6;
		if(!me){
			$('.boardtop').append(makeToken('temp', 'red',left));
			$('.innerboard').append(makeToken('ghost', 'red',left,bottom,true));
		}else{
			$('.boardtop').append(makeToken('temp', 'blue',left));
			$('.innerboard').append(makeToken('ghost', 'blue',left,bottom,true));
		}
	}

 
	function updatetop(e){
		var pos   = $('.board').offset();
		var elPos = { X:pos.left , Y:pos.top };
		var mPos  = { X:e.clientX-elPos.X, Y:e.clientY-elPos.Y };

		for(var i =0;i<8;i++){
			if(mPos.X >= i*64 && mPos.X < (i+1)*64 && cur!=i){
				cur=i;
				newtile();
			}
		};		
	};

	function onBoard(x,y){
		return (x>=0 && x <8 && y < 8 && y >=0);
	}

	function turnGold(x,y,dir){
		for(var i=0;i<4;i++){
			var id = '#' + ((x + directions[dir][0]*i)*10 +  (y + directions[dir][1]*i));
			$(id).css('background-color', 'gold');
		}
		if(me)
			$('#winner').html('red won!');
		else
			$('#winner').html('blue won!');
		over = true;
	}

	function checkwin(x,y){
		for(var i=0;i<directions.length;i++){
			if(onBoard(x+directions[i][0]*3,y+directions[i][1]*3)){
				var compare = true;
				for(var j=0;j<3;j++){
					compare = compare && (tokens[x+directions[i][0]*j][y+directions[i][1]*j] == tokens[x+directions[i][0]*(j+1)][y+directions[i][1]*(j+1)]);
				}
				if(compare)
					turnGold(x,y,i);
			}
		}
	}

	function checkwins(){
		for(var i=0;i<moves.length;i++){
			var id = parseInt(moves[i]);
			var y = id%10;
			var x = Math.floor(id/10);
			checkwin(x,y);
		}
	}

	$('.board').mousemove(updatetop);
	$('.innerboard').mousemove(updatetop);


	$('.board').click(function(){
		var len = tokens[cur].length;
		if(len < 8 && !over){
			var pos = ''+(cur*10+len);
			moves.push(pos);
			var left = cur*64+2,
				bottom = len*64+6;
			if(!me){
				tokens[cur][len] = 'r';
				$('.innerboard').append(makeToken(pos, 'red',left,bottom,true));
			}else{
				tokens[cur][len] = 'b';
				$('.innerboard').append(makeToken(pos, 'blue',left,bottom,true));
			};
			me = !me;
			newtile();
			checkwins();
		}
	});

	$('#undo').click(function(){
		if(moves.length && !over){
			var id = parseInt(moves.pop());
			$('#' + id).remove();
			var y = id%10;
			var x = Math.floor(id/10);
			tokens[x].splice(y-1,1);
			me = !me;
			newtile();
		}
	});

	function reset(){
		tokens = [];
		for(var r =0;r<8;r++){
			tokens[r] = [];
		}
		moves = [];
		over = false;
		$('.innerboard').empty();
		$('#winner').empty();
	}

	$('#reset').click(reset);

	$('#toggle').click(function(){ 
		me=!me;
		newtile();
	});
});
