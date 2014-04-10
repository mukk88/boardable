$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"http://quickpick.herokuapp.com/subscribers",
		dataType: "jsonp",
		success: function (data) {
	      console.log(data)
	      alert(data);
	  	}
	});
})
	