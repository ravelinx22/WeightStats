import * as d3 from "d3";

export function lineChart() {
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = window.innerWidth*0.68 - margin.left - margin.right,
		height = (width - margin.left - margin.bottom)*.55 - margin.top - margin.bottom,
		yTitle = "y-axis",
		isMultiLine = false,
		color = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(0, 9)),
		xScale = d3.scaleTime(),
		yScale = d3.scaleLinear(),
		xValue = function(d) { return d;  },
		firstYValue = function(d) { return d;  },
		secondYValue = function(d) { return d;  },
		x = xScale.rangeRound([0, width]),
		y = yScale.rangeRound([height, 0]),
		onMouseOver = function(d,i) { return d;  },
		line = d3.line()
		.x(function(d) { return x(d.date);   })
		.y(function(d) { return y(d.close);   }),
		line2 = d3.line()
		.x(function(d) { return x(d.date);  })
		.y(function(d) { return y(d.close2)  });

	function chart(selection) {
		selection.each(function(data) {	
			data = data.map((d,i) => {
				return {
					date: xValue(d),
					close: firstYValue(d),
					close2: secondYValue(d)
				}
			});

			updateDimensions(window.innerWidth);

			x.domain(d3.extent(data, xValue));
			y.domain([0, d3.max(data, function(d) {
				const firstValue = d.close;
				const secondValue = d.close2 ? d.close2 : -1;
				return Math.max(firstValue, secondValue);
			})]);

			var svg = d3.select(this)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);
			svg.select("*").remove();

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
				.call(d3.axisBottom(x))
				.attr("class", "axisBottom")
				.attr("transform", "translate(0," + height + ")")
				.select(".domain");

			g.append("g")
				.call(d3.axisLeft(y))
				.attr("class", "axisLeft")
				.append("text")
				.attr("fill", "#000")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.17em")
				.attr("text-anchor", "end")
				.text(yTitle);

			appendLinePath(g, data, line, color(1));

			if(isMultiLine) {
				appendLinePath(g, data, line2, color(2));
			}
		});

	}

	function appendLinePath(g, data, line, color) {
		g.append("g")
			.selectAll("path")
			.data(data.slice(0,data.length-1))
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke", color)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1.5)
			.attr("d", (d,i) => {
				return line([data[i], data[i+1]])
			})
			.on("mouseover", onMouseOver);
	}

	function updateDimensions(winWidth) {
		width = winWidth*0.68 - margin.left - margin.right;
		height = (width - margin.left - margin.bottom)*.55 - margin.top - margin.bottom;
		x = xScale.rangeRound([0, width]);
		y = yScale.rangeRound([height, 0]);
		line = d3.line()
		.x(function(d) { return x(d.date);   })
		.y(function(d) { return y(d.close);   });
		line2 = d3.line()
		.x(function(d) { return x(d.date);  })
		.y(function(d) { return y(d.close2)  });
	}

	chart.width = function(_) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	}

	chart.height = function(_) {
		if(!arguments.length) return height;
		height = _;
		return chart;
	}

	chart.yTitle = function(_) {
		if(!arguments.length) return yTitle;
		yTitle = _;
		return chart;
	}

	chart.xValue = function(_) {
		if(!arguments.length) return xValue;
		xValue = _;
		return chart;
	}

	chart.firstYValue = function(_) {
		if(!arguments.length) return firstYValue;
		firstYValue = _;
		return chart;
	}

	chart.secondYValue = function(_) {
		if(!arguments.length) return secondYValue;
		secondYValue = _;
		return chart;
	}

	chart.onMouseOver = function(_) {
		if(!arguments.length) return onMouseOver;
		onMouseOver = _;
		return chart;
	}

	chart.isMultiLine = function(_) {
		if(!arguments.length) return isMultiLine;
		isMultiLine = _;
		return chart;
	}

	return chart;
}
