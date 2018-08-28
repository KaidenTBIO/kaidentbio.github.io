const config = {
	binaryThresh: 0.5,
	inputSize: 25,
	hiddenLayer: [10, 10, 10, 5],
	activation: 'sigmoid'
}

let input = [0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0];

$(document).ready(function(){
	const net = new brain.NeuralNetwork(config);

	net.train([train1.v1, train1.v2, train1.v3,
			  train2.v1, train2.v2, train2.v3,
			  train3.v1, train3.v2, train3.v3,
			  train4.v1, train4.v2, train4.v3]);

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
	});

	$(".getOutput").click(function(event) {
		const output = net.run(input);

		var max = output[0];
		var maxIndex = 0;

		for (let i = 0; i < output.length; i++) {
			if (output[i] > max) {
				maxIndex = i;
				max = output[i];
			}
		}
		console.log(input);
		//document.getElementById("result").value = maxIndex;
		$("#result").text(maxIndex.toString());
	});

	$(".inputforTraining").click(function(event) {
		var output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var idx = parseInt(document.getElementById("trainOutput").value);
		output[idx] = 1;

		var trainNow = {
			input: input,
			output: output
		};

		net.train(trainNow);
	});
});
