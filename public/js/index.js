'use strict';
// Bussin valintanappula
const socket = io().connect('http://busdata.metropolia.fi:3000');
$(document).ready(function () {
	let speedBarTimeProgress;
	let data = {};
	let chart;

	// uusin vastaanotettu sensoridata tallentuu tänne
	let globalDataEntry;

	socket.on('itku', function (msg1) {
		let app_id = msg1.app_id;
		let dev_id = msg1.dev_id;
		let timeStamp = msg1.timeStamp;
		let location = msg1.location;
		let audio = msg1.audio;
		let motionsensor = msg1.motionsensor;
		let device = msg1.device;
		// Piirretään uusimmat tiedot jos kenttä on luotu
		if ($(`.wrapper > #2-defaults > #rawData2`).text().length > 5) {
			console.log("toimii");
			widgetRawDataRefresh(msg1);
		}
		globalDataEntry = msg1;
	}
	);

	// Nappuloiden toiminta
	$('.buttonRawData1').click(function () {
		if (this.checked) {
			$(`.wrapper > #2-defaults`).append("<div id='rawData2'> Sensoridata näkyy tässä </div>");
		} else {
			$(`.wrapper > #2-defaults > #rawData2`).remove();
		}
	});
	$('.buttonGyro1').click(function () {
		if (this.checked) {
			$(`.wrapper > #2-defaults`).append("<div id='gyro2'> Gyro näkyy tässä </div>");
		} else {
			$(`.wrapper > #2-defaults > #gyro2`).remove();
		}
	});
	$('.buttonMap1').click(function () {
		if (this.checked) {
			 
			 $(`.wrapper > #2-defaults`).append("<div id='mapid'></div>");
			$(`.wrapper > #2-defaults`).append(widgetMap());
		} else {
			$(`.wrapper > #2-defaults > #mapid`).remove();
		}
	});
	$('.buttonSpeedBar1').click(function () {
		if (this.checked) {
			$(`.wrapper > #2-defaults`).append("<div id='speedBar2'> Speedbar näkyy tässä </div>");
			initSpeedBar();
		} else {
			$(`.wrapper > #2-defaults > #speedBar2`).remove();
		}
	});
	$('.buttonSpeedChart1').click(function () {
		if (this.checked) {
			$(`.wrapper > #2-defaults`).append("<div id='graph2' class='aGraph' style='width:300px; height:30px;'>asd</div>");
		} else {
			$(`.wrapper > #2-defaults > #graph2`).remove();
		}
	});


	// Pudotusvalikkojen näyttäminen
	$('.valintaLista.1').click(function () {
		document.getElementById("widgetSelect1").classList.toggle("show");
	});
	$('.valintaLista.2').click(function () {
		document.getElementById("widgetSelect2").classList.toggle("show");
	});
	$('.valintaLista.3').click(function () {
		document.getElementById("widgetSelect3").classList.toggle("show");
	});
	$('.valintaLista.4').click(function () {
		document.getElementById("widgetSelect4").classList.toggle("show");
	});

	// Close the dropdown menu if the user clicks outside of it
	/*window.onclick = function (event) {
		if (!event.target.matches('.valintaLista')) {
	//		console.log("triggered");
			let dropdowns = document.getElementsByClassName("dropdown-content");
			let i;
			for (i = 0; i < dropdowns.length; i++) {
				let openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	};
	*/


	function widgetRawDataRefresh(globalDataEntry) {
		$(`.wrapper > #2-defaults > #rawData2`).empty();
		$(`.wrapper > #2-defaults > #rawData2`).append(
			'Laite ID: ' + globalDataEntry.dev_id,
			'<br>Nopeus: ' + globalDataEntry.location.speed,
			'<br>GPS: ' + globalDataEntry.location.coordinates,
			'<br>Viesti: ' + globalDataEntry.device.msg,
			'<br>Viimeisin tieto: ' + globalDataEntry.timeStamp);
	};

	function displayGraphExample(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
		// create an SVG element inside the #graph div that fills 100% of the div
		var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");

		// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
		var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];

		// X scale will fit values from 0-10 within pixels 0-100
		var x = d3.scale.linear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
		// Y scale will fit values from 0-10 within pixels 0-100
		var y = d3.scale.linear().domain([0, 10]).range([0, height]);

		// create a line object that represents the SVN line we're creating
		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			.x(function (d, i) {
				// verbose logging to show what's actually being done
				//console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
				// return the X coordinate where we want to plot this datapoint
				return x(i);
			})
			.y(function (d) {
				// verbose logging to show what's actually being done
				//console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
				// return the Y coordinate where we want to plot this datapoint
				return y(d);
			})
			.interpolate(interpolation)

		// display the line by appending an svg:path element with the data line we created above
		graph.append("svg:path").attr("d", line(data));
		// or it can be done like this
		//graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);


		function redrawWithAnimation() {
			// update with animation
			graph.selectAll("path")
				.data([data]) // set the new data
				.attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
				.attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
				.transition() // start a transition to bring the new value into view
				//.ease("linear")
				.duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
				.attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value

			/* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
		}

		function redrawWithoutAnimation() {
			// static update without animation
			graph.selectAll("path")
				.data([data]) // set the new data
				.attr("d", line); // apply the new data values
		}

		setInterval(function () {
			var v = data.shift(); // remove the first element of the array
			data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
			if (animate) {
				redrawWithAnimation();
			} else {
				redrawWithoutAnimation();
			}
		}, updateDelay);
	}

	displayGraphExample("#graph1", 300, 30, "basis", true, 1000, 1000);


	function initSpeedBar() {
		var t = 1297110663, // start time (seconds since epoch)
			v = 70,
			data = d3.range(1).map(next); // starting dataset
		function next(nopeus) {
			console.log('piirtoon nopeus:' + nopeus);
			return {
				time: ++t,
				value: v = nopeus,
			};
		}

		var w = 30,
			h = 150;

		//var padding = 30;

		var y = d3.scaleLinear()
			.domain([0, 1])
			.range([0, 30]);

		var x = d3.scaleLinear()
			.domain([0, 30])
			.rangeRound([0, w]);

		var chart = d3.select("#speedBar2")
			.append("svg:svg")
			.attr("class", "chart")
			.attr("width", 200)
			.attr("height", w)
			.attr("position", "absolute")
			.attr("float", "right");

		chart.selectAll("rect")
			.data(data)
			.enter().append("svg:rect")
			.attr("y", function (d, i) { return x(i) - .5; })
			.attr("x", function (d) { return h - y(d.value) - .5; })
			.attr("height", w)
			.attr("width", function (d) { return y(d.value); });

		function redraw() {
			chart.selectAll('rect')
				.data(data)
				.transition()
				.duration(1000)
				.attr('x', function (d) { return h - y(d.value) - .5; })
				.attr('width', function (d) { return y(d.value); });
		}
		socket.on('itku', function (msg1) {
			let nopeus = msg1.location.speed;
			console.log("nopeuskäppyränopeus" + nopeus);
			data.shift();
			data.push(next(nopeus));
			redraw();
		});
	}


	function piirragyro() {
		$(".div2").append("<div class='garden'><div class='ball'><pre class='output'></pre>");
		let ball = document.querySelector('.ball');
		let garden = document.querySelector('.garden');
		let output = document.querySelector('.output');

		let maxX = garden.clientWidth - ball.clientWidth;
		let maxY = garden.clientHeight - ball.clientHeight;

		function handleOrientation(event) {
			let x = event.beta;  // In degree in the range [-180,180]
			let y = event.gamma; // In degree in the range [-90,90]

			output.innerHTML = 'vertical angle : ' + x.toFixed(0) + '°' + '\n';
			output.innerHTML += 'horizontal angle: ' + y.toFixed(0) + '°' + '\n';

			// Because we don't want to have the device upside down
			// We constrain the x value to the range [-90,90]
			if (x > 90) {
				x = 90;
			};
			if (x < -90) {
				x = -90;
			};

			// To make computation easier we shift the range of
			// x and y to [0,180]
			x += 90;
			y += 90;

			// 10 is half the size of the ball
			// It center the positioning point to the center of the ball
			ball.style.top = (maxX * x / 180 - 10) + 'px';
			ball.style.left = (maxY * y / 180 - 10) + 'px';
		}

		window.addEventListener('deviceorientation', handleOrientation);

		var crossvent = require('crossvent');
		var sortable = $('sortable');

		dragula([$('left-defaults'), $('right-defaults')]);
		dragula([$('left-copy'), $('right-copy')], { copy: true });
		dragula([$('left-events'), $('right-events')])
			.on('drag', function (el) {
				el.className = el.className.replace('ex-moved', '');
			})
			.on('drop', function (el) {
				el.className += ' ex-moved';
			})
			.on('over', function (el, container) {
				container.className += ' ex-over';
			})
			.on('out', function (el, container) {
				container.className = container.className.replace('ex-over', '');
			});
		dragula([$('left-rollbacks'), $('right-rollbacks')], { revertOnSpill: true });
		dragula([$('left-lovehandles'), $('right-lovehandles')], {
			moves: function (el, container, handle) {
				return handle.classList.contains('handle');
			}
		});

		dragula([$('left-rm-spill'), $('right-rm-spill')], { removeOnSpill: true });
		dragula([$('left-copy-1tomany'), $('right-copy-1tomany')], {
			copy: function (el, source) {
				return source === $('left-copy-1tomany');
			},
			accepts: function (el, target) {
				return target !== $('left-copy-1tomany');
			}
		});

		dragula([sortable]);

		crossvent.add(sortable, 'click', clickHandler);

		function clickHandler(e) {
			var target = e.target;
			if (target === sortable) {
				return;
			}
			target.innerHTML += ' [click!]';

			setTimeout(function () {
				target.innerHTML = target.innerHTML.replace(/ \[click!\]/g, '');
			}, 500);
		}
		function $(id) {
			return document.getElementById(id);
		}
	}

//Muuta nimeksi widgetMap
function widgetMap() {

    var mymap = L.map('mapid').setView([60.220037, 24.810368], 14);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/niklasnu/civw7c6yq001y2jo50bx3mg3k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmlrbGFzbnUiLCJhIjoiY2l2dzczZnJpMDAwOTJ0bXZtM3UxcWtnciJ9.r5ajbQRLujQGJXzDLNfnNA', {
    maxZoom: 18,
    id: 'mapbox.mapbox-streets-v7',
    accessToken: 'pk.eyJ1IjoibmlrbGFzbnUiLCJhIjoiY2l2dzczZnJpMDAwOTJ0bXZtM3UxcWtnciJ9.r5ajbQRLujQGJXzDLNfnNA'
}).addTo(mymap);
    
    //Päivitetään uusi sijaintitieto
    updateLocation(mymap, "001", [60.220037, 24.810368] );    
    
    
}
    //Jos laite on lähettänyt uuden gps sijainnin, vanha sijainti marker poisteetaan ja uusi piirretään tilalle
    var markerLocations = {};
    function updateLocation(map, deviceID, coordinateArray) {
    if (!markerLocations[deviceID] === undefined){
        var oldMarker = markerLocations[deviceID];
        map.removeLayer(oldMarker);
    }
    
    //Piirretään uusi marker
    var newMarker = L.marker(coordinateArray).addTo(map);
    markerLocations[deviceID] = newMarker;
    }

    //function widgetMapRefresh() {


});
