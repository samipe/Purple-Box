'use strict';
// Bussin valintanappula
const socket = io().connect('http://busdata.metropolia.fi:3000');
$(document).ready(function() {
	let nopeus;
	let quad;

	socket.on('APP_IDitku', function(msg1) {
		console.log(msg1.split(':'));
		quad = msg1.split(':')[2];
		nopeus = msg1.split(':')[5];
		console.log(quad);
		$(`.div${quad} > .dataText`).empty();
		$(`.div${quad} > .dataText`).append(msg1);
	});

	$('.piirraNopeusNappi').click(function() {
		$('.div' + quad).append(piirranopeus(nopeus));
	});
		$('.piirraGyroNappi').click(function() {
		$('.div' + quad).append(piirragyro());
	});
});


function piirranopeus(nopeus) {
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

	var w = 75,
		h = 200;

	var padding = 30;

	var x = d3.scaleLinear()
		.domain([0, 1])
		.range([0, w]);

	var y = d3.scaleLinear()
		.domain([0, 30])
		.rangeRound([0, h]);

	var chart = d3.select(".div2")
		.append("svg:svg")
		.attr("class", "chart")
		.attr("width", 20)
		.attr("height", h)
		.attr("position", "absolute")
		.attr("float", "right");

	chart.selectAll("rect")
		.data(data)
		.enter().append("svg:rect")
		.attr("x", function (d, i) { return x(i) - .5; })
		.attr("y", function (d) { return h - y(d.value) - .5; })
		.attr("width", w)
		.attr("height", function (d) { return y(d.value); });

	chart.append("svg:line")
		.attr("x1", 0)
		.attr("x2", w * data.length)
		.attr("y1", h - .5)
		.attr("y2", h - .5)
		.attr("stroke", "#000");


	function redraw() {

		chart.selectAll('rect')
			.data(data)
			.transition()
			.duration(1000)
			.attr('y', function(d) { return h - y(d.value) - .5; })
			.attr('height', function(d) { return y(d.value); });

	}

	socket.on('APP_IDitku', function(msg1) {
		nopeus = msg1.split(':')[6];
		nopeus = nopeus.substring(0, 2);
		data.shift();
		data.push(next(nopeus));
		redraw();
	});
}


function piirragyro() {
	$( ".div2" ).append("<div class='garden'><div class='ball'><pre class='output'></pre>");
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
      ball.style.top = (maxX*x/180 - 10) + 'px';
      ball.style.left = (maxY*y/180 - 10) + 'px';
    }

    window.addEventListener('deviceorientation', handleOrientation);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
} 


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
     /* if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      } */
    }
  }
}

