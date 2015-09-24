$(document).ready(function(){
	$('#btnSubmit').on('click', function(){
		if ($('#inputURL').val() === ''){
			alert('enter a url');
		}else{
			$.ajax({
				type:"POST",
				data:{lURL:$('#inputURL').val()},
				url:'/addurl'
			}).done(function(response){
				if (response != ''){
					$('#output').html('<p>'+response+'</p>');

				}else{
					alert('an error occurred');
				}
			});
		}
	});
});
