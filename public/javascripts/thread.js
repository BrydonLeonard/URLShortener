$(document).ready(function(){
	$('#inputComment').on('keypress', function(key){
		if (key.which == 13)
			$.ajax({
				type:"POST",
				data:{text:$(this).val()}
			}).done(function(response){
				if (response === "success"){
					location.reload();
				}
			});
	});
	$('#submitComment').on('click', function(){
			$.ajax({
				type:"POST",
				data:{text:$('#inputComment').val()}
			}).done(function(response){
				if (response === "success"){
					location.reload();
				}
			});
	});
	
});
