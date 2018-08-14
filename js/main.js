let input = [0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0];

$(document).ready(function(){
	$(".pixel").click(function(event) {
		var idx = parseInt($(this).attr('id'));
		
		input[idx] = input[idx] ^ 1;

		/*if($(this).attr('class') === 'pixel') {
			input[idx] = 1;
		} else {
			input[idx] = 0;
		}*/

		$(this).toggleClass('pixel darkPixel');
		console.log(input);
	})
});