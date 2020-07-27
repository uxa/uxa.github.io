let capMap = {'hospitalizedCurrently': 'Hospitalized', 'inIcuCurrently': 'In ICU', 'onVentilatorCurrently': 'On Ventilator'}
let testMap = {'positive': 'Positive', 'negative': 'Negtive'}
let colorMap = {'Hospitalized': "#FFE400", "In ICU": "#FF7B00", "On Ventilator": "#FF1100"}

let margin = {top: 20, right: 20, bottom: 50, left: 80},
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let x_1 = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
let y_1 = d3.scaleLinear()
            .range([height, 0]);

let x_12 = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
let y_12 = d3.scaleLinear()
          .range([height, 0]);
          
let svg = d3.select("#slide3-2")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let svg2 = d3.select("#slide3-2")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let div = d3.select("body")
            .append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

d3.csv("data/illinois-tests-results.csv", function(error, data) {

  data.forEach(function(d) {
    d.value = +d.value;
  });

  x_1.domain(data.map(function(d) { return testMap[d.attr]; }));
  y_1.domain([50000, 3000000])

  svg.selectAll(".bar")
     .data(data)
     .enter().append("rect")
      .attr("x", function(d) { return x_1(testMap[d.attr]); })
      .attr("width", x_1.bandwidth())
      .attr("y", function(d) { return y_1(d.value); })
      .attr("height", function(d) { return height - y_1(d.value); })
      .attr("fill", function(d) { return testMap[d.attr] == 'Positive' ? 'red' : 'green';})
      .on('mouseover', function (d){
                div.transition().duration(200).style("opacity", .9);
                div.html("<p> <b>" + "Count : " + d.value)
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");})
       .on("mouseout", function(d) {		
                div.transition()		
                .duration(500)		
                .style("opacity", 0);});

  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .attr('class', 'axisW')
     .attr('stroke', 'aliceblue')
     .call(d3.axisBottom(x_1));

  svg.append("g")
     .attr('class', 'axisW')
     .attr('stroke', 'aliceblue')
     .call(d3.axisLeft(y_1));

  svg.append("text")
     .attr("text-anchor", "end")
     .attr("x", width)
     .attr("y", height + margin.top + 10)
     .attr('fill', 'aliceblue')
     .text("Test result");

  svg.append("text")
     .attr("text-anchor", "end")
     .attr("transform", "rotate(-90)")
     .attr("y", -margin.left+20)
     .attr('fill', 'aliceblue')
     .attr("x", -margin.top)
     .text("Cases")

});

d3.csv("data/illinois-hospital-data.csv", function(error, data2) {

  data2.forEach(function(d) {
    d.value = +d.value;
  });
  

  x_12.domain(data2.map(function(d) { return  capMap[d.attr]; }));
  y_12.domain([0, 2000])

  svg2.selectAll(".bar")
      .data(data2)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_12(capMap[d.attr]); })
      .attr("width", x_12.bandwidth())
      .attr("y", function(d) { return y_12(d.value); })
      .attr('fill', function(d) { return colorMap[capMap[d.attr]]; })
      .attr("height", function(d) { return height - y_12(d.value); })
      .on('mouseover', function (d){
                div.transition().duration(200).style("opacity", .9);
                div.html("<p> <b>" + "Count : " + d.value)
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");})
      .on("mouseout", function(d) {		
                div.transition()		
                .duration(500)		
                .style("opacity", 0);});

  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr('class', 'axisW')
      .attr('stroke', 'aliceblue')
      .call(d3.axisBottom(x_12));

  svg2.append("g")
      .attr('class', 'axisW')
      .attr('stroke', 'aliceblue')
      .call(d3.axisLeft(y_12));

  svg2.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 10)
      .attr('fill', 'aliceblue')
      .text("Condition");

  svg2.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr('fill', 'aliceblue')
      .attr("x", -margin.top)
      .text("Cases")

});