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
					var newButton = $('<button id="btnPrevious">View previous</button>')
					$('#output').append(newButton);


					newButton.on('click', function(){
						console.log('doing stuff');
						$.ajax({type:"GET",
							url:'getall'
						}).done(function(allResp){
							var jsonResp = allResp;
							var tableData = "";
							for (var i = 0; i < jsonResp.length; i++)
							{
								tableData = tableData + ('<tr><td>' + jsonResp[i].s + '</td>');
								tableData = tableData + ('<td>' + jsonResp[i].l + '</td></tr>');
								console.log(jsonResp);
							}
							$('#output').append('<table align="center" style="width:\'60%\'"">'+tableData+'</table>');
						});
					});

				}else{
					alert('an error occurred');
				}
			});
		}
	});
});
