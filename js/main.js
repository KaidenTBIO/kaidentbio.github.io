$(document).ready(function () {
	// Configuration object for Brain.js
	var config = {
		binaryThresh: 0.5,
		inputSize: 25,
		hiddenLayers: [10, 10, 10, 5],
		activation: 'sigmoid'
	};

	// Basic input, handled as nothing being drawn
	var input = [
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0
	];
	
	// Network initialization
	var net = new brain.NeuralNetwork(config);

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
		let layers = [];

		$('.layerClass').each(function (index, element) {
			layers.push(parseInt(element.value));
		});
		
		let actFunc = document.getElementById('function').value;
		
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
	
	$('.export').click(function() {
		const json = JSON.stringify(net.toJSON());
		
		let element = document.getElementById('saveLink');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + json);
		element.setAttribute('download', 'RedeNeural.json');
		element.innerHTML = 'Baixe sua rede neural!';
	});

	$('.import').click(function() {
		let files = document.getElementById('selectFiles').files;
		if (files.length <= 0) {
			return false;
		}

		let fr = new FileReader();

		fr.onload = function(e) {
			var obj = JSON.parse(e.target.result);
			net.fromJSON(obj);
		};

		fr.readAsText(files.item(0));

		//net.fromJSON(result)
	});

	$('#layersAmt').change(function () { 
		//e.preventDefault();
		let v = $(this).val();
		let htmlthing = '';
		for(let i = 0; i < v; i++) {
			htmlthing += `Camada ${i+1}: <input type="number" id="layer${i}" min=1 max=30 class="layerClass"><br>`;
		}
		$('#layers').html(htmlthing);
	});
});
