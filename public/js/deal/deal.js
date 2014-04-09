$(document).ready(function(){
	var size = 64;
	var border = 2;
	function gomobile(){
		$('html').css('font-size','4.2em');
		$('.container').width('100%');
		$('body').width('100%');
		$('body').height('100%');
		$('.container').css('margin-top', '0px');
		$('.container').css('border', '0px');
		$('.container').height('100%');
		$('#top').height('200');
		$('img').height('210');
		$('img').width('210');
		$('p').css('margin', '22px 0');
		$('button').css('padding', '10px 27px');
		$('button').css('margin-top', '20px');
		$('input').css('padding', '15px');
		$('img').css('margin-left', '60px');
		size = 210;
		border = 4;
	}

	if(/Android|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) ) {
		gomobile();
	}
	$('img').click(function(){
		if($(this).css('border-left-width')[0] == '0'){
			$(this).css('border', border + 'px solid midnightblue');	
			$(this).height(size-2*border);	
			$(this).width(size-2*border);
		}else{
			$(this).css('border','0px solid');		
			$(this).height(size);	
			$(this).width(size);
		}
	});

	$('.inputnum').focusout(function(){
		var number = $(this).val();
		if(!number || number ="0"){
			return;
		};
		var number = parseInt(number)
		if(!number){
			alert('please input a number');
			$(this).val('');
			$(this).focus();
		};
	})

	function getKSLfeed(category, subcategory, minPrice, maxPrice, search){
		rss = 'http://www.ksl.com/resources/classifieds/rss_.xml?nid=231'
		rss += '&category=' + category;
		rss += '&cat=' + subcategory;
		rss += '&min_price=' + minPrice;
		rss += '&max_price=' + maxPrice;
		rss += '&search=' + encodeURIComponent(search);
		return rss;
	}

	$('#find').click(function(){
		$('#middle').hide();
		var gif = $('<img>').attr('src', 'images/ajax.gif');
		var para = $('<p>').html('loading..');
		var loading = $('<div>').html(gif)
		loading.append(para);
		loading.attr('id','loading');
		$('.container').append(loading);
		var search = $('#search').val();
		var min = $('#min').val();
		var max = $('#max').val();
		var phone = $('#num').val();
		var maincat = $('#main').find(":selected").attr('id');
		var subcat = $('#sub').find(":selected").attr('id');
		var rss = getKSLfeed(maincat,subcat,min,max,search);
		console.log(rss);
		$.ajax({
			type:"POST",
			url:"http://quickpick.herokuapp.com/subscribers",
			data: {phone:phone, url:rss}
		}).success(function(msg){
			alert('it worked' + msg);
		}).error(function(){
			alert('did not work');
		});
		// setTimeout(function(){
		// 	gif.hide();
		// 	para.html('Done.<br><br>You should be hearing from us shortly :)')
		// 	var back = $('<button>').html('back');
		// 	back.click(function(){
		// 		$('#loading').hide();
		// 		$('#middle').show();
		// 	});
		// 	loading.append(back);
		// }, 1000);
	});
})