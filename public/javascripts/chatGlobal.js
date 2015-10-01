$(document).ready(function(){

		$('#chat-input').on('keypress', function(key){
				if (key.which == 13)
				{
					$.ajax({
						type:"POST",
						data:{m:$('#chat-input').val()}
					}).done(function(res){
						if (res != "failed"){
							$('#chatHolder').html('');
						for (var i = 0; i < res.length; i++){
							$outerDiv = $('<div class="chat-item"><div class="chat-time">'+res[i].t+'</div><div class="chat-text">'+res[i].m+'</div></div>');
							$outerDiv.css('color',res[i].c);
							$('#chatHolder').append($outerDiv);
						}
						}else{
							alert('Network Error');
						}
					});
						$('#chat-input').val('');
				}

		});
});
