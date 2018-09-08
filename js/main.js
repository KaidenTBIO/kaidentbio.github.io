// Configuration object for Brain.js
let config = {
	binaryThresh: 0.5,
	inputSize: 25,
	hiddenLayers: [10, 10, 10, 5],
	activation: 'sigmoid'
};

// Basic input, handled as nothing being drawn
let input = [
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0
];

$(document).ready(function () {
	// Network initialization
	let net = new brain.NeuralNetwork(config);

	// trainData from src/training_data.js
	// TODO: Find better way to initialize training data
	net.train(trainData);

	// Button handler; toggles buttons and positional values on the input array "on" and "off"
	$('.pixel').click(function (event) {
		var idx = parseInt($(this).attr('id'));

		input[idx] = input[idx] ^ 1;

		$(this).toggleClass('pixel darkPixel');

		return event; //eslint stop screaming at me
	});

	// Basic network output fetcher
	$('.getOutput').click(function (event) {
		const output = net.run(input);

		var max = output[0];
		var maxIndex = 0;

		for (let i = 0; i < output.length; i++) {
			if (output[i] > max) {
				maxIndex = i;
				max = output[i];
			}
		}

		$('#result').text(maxIndex.toString());

		return event; //eslint stop screaming at me
	});

	// Send the input through the network for training, "teaching" that drawing to the network
	$('.inputforTraining').click(function (event) {
		var output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var idx = parseInt(document.getElementById('trainOutput').value);
		output[idx] = 1;

		var trainNow = {
			input: input,
			output: output
		};

		trainData.push({input: trainNow.input, output: trainNow.output});

		net.train(trainNow);

		return event; //eslint stop screaming at me
	});

	// Asks for user input to customize the network to their liking
	// TODO: Add activation function selector
	// TODO: Add "Save network" option; send the user a file that contains the network in a JSON format; make it so the user can send the file back into the website and retrain the network they were fiddling with before
	$('.customize').click(function (event) {
		let layers = document.getElementById('layersArr').value;
		if (layers === "") {
			alert('Não vejo camadas aqui.');
			return; 
		}

		layers = layers.split(' ');
		
		let actFunc = document.getElementById('function').value;
		
		for(var i = 0; i < layers.length; i++){
			layers[i] = parseInt(layers[i]);

			// prevents last character being ""
			// no stupid inputs in my christian code
			if (isNaN(layers[i])) layers.pop(i);
		}
		
		config = {
			binaryThresh: 0.5,
			inputSize: 25,
			hiddenLayers: layers,
			activation: actFunc
		};

		net = new brain.NeuralNetwork(config);
		net.train(trainData);

		return event; //eslint stop screaming at me
	});
});
