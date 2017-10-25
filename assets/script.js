var select=""
var isSelected = false

$('#heroImage').on('click', function(event){
	isSelected = true;
	select = $(this).val();
	$('#heroImage').text("assets/images/longstarSelectOnClick.PNG")
})