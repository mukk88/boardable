$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"http://quickpick.herokuapp.com/subscribers",
		dataType: "jsonp",
		cache: true,  // the API complains about the extra parameter
	    data: {  // the parameters to add to the request
	        format: 'json',
	        action: 'query',
	        titles: 'test'
	    },
		success: function (data) {
	      console.log(data)
	      alert(data);
	  	}
	});
})
	