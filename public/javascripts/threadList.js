$(document).ready(function(){
	$('#buttonNewThread').on('click', function(){
		var threadName = prompt('Enter name of thread', 'Thread Name');
		$.ajax({
			type:"POST",
			data:{threadName:threadName}
		}).done(function(response){
			if (response==="success")
				location.reload();
			else alert('Something went wrong');
		});
	});
	$('a.anchorDelete').on('click', function(event){
		console.log($(this).context.getAttribute('link'));
		event.preventDefault();
		var adminCred = prompt("Admin credentials?");
		if (adminCred.length > 0){
			$.ajax({
				type:"POST",
				data:{id:$(this).context.getAttribute('link')},
				url:'delete'
			}).done(function(response){
				if (response==="success")
				{
					location.reload();
				}else alert("Something went wrong");
			});
		}
	});
});
