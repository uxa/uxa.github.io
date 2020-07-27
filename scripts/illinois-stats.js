
let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let svg3 = d3.select("#slide3-2")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom+20)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
let div = d3.select("body")
            .append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

let svg4 = d3.select("#slide3-2")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom+20)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let svg5 = d3.select("#slide3-2")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom+20)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const annotations = [
    {
      note: {
        label: "Attributed to the increase in testing by 150%",
        title: "Peak count"
      },
      type: d3.annotationCalloutCircle,
      subject: {
        radius: 10,
        radiusPadding: 20
      },
      color: ["red"],
      x: 423,
      y: 70,
      dy: 50,
      dx: 90
    }
  ]

const makeAnnotations = d3.annotation()
                          .annotations(annotations)

svg3.append('svg')
    .attr('width', 960)
    .attr('height', 400)
    .append("g")
    .call(makeAnnotations)

d3.csv("data/illinois.csv",

    function(d){
        return { date : d3.timeParse("%Y%m%d")(d.date), value : +d.positiveIncrease }
    },
    function(data) {

    let x = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);
    
    svg3.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisBottom(x));

    let y = d3.scaleLinear()
              .domain( [0, 5000])
              .range([ height, 0 ]);
    
    svg3.append("g")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisLeft(y));

    svg3.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) }))

    svg3.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 3)
        .attr("fill", "#69b3a2")
        .on('mouseover', function (d){
            d3.select(this).attr("fill", "red");
            div.transition().duration(200).style("opacity", .9);
            date = new Date(d.date);
            div.html("<b>" + "Date: </b>" + date.toDateString() + "<br> <b>" + "Cases: </b>" + d.value)
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");})
        .on("mouseout", function(d) {	
            d3.select(this).transition().duration(500).attr("fill", "#69b3a2");	
            div.transition()		
            .duration(500)		
            .style("opacity", 0);});

    svg3.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .attr('fill', 'aliceblue')
        .text("Week");

    svg3.append("text")
        .attr("text-anchor", "end")
        .attr('fill', 'aliceblue')
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+10)
        .attr("x", -margin.top)
        .text("New cases")

    svg3.append("circle")
        .attr("cx",190)
        .attr("cy",130)
        .attr("r", 6)
        .style("fill", "#69b3a2")

    svg3.append("text")
        .attr("x", 200)
        .attr("y", 130)
        .text("New cases per day")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
        .attr('fill', 'aliceblue')

});

d3.csv("data/illinois.csv",

    function(d){
        return { date : d3.timeParse("%Y%m%d")(d.date), value : +d.deathIncrease }
    },

    function(data) {

    let x2 = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg4.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisBottom(x2));

    let y2 = d3.scaleLinear()
        .domain( [0, 250])
        .range([ height, 0 ]);
        
    svg4.append("g")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisLeft(y2));

    svg4.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x2(d.date) })
        .y(function(d) { return y2(d.value) }))

    svg4.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x2(d.date) } )
        .attr("cy", function(d) { return y2(d.value) } )
        .attr("r", 3)
        .attr("fill", "#69b3a2")
        .on('mouseover', function (d){
            d3.select(this).attr("fill", "red");
            div.transition().duration(200).style("opacity", .9);
            date = new Date(d.date);
            div.html("<b>" + "Date: </b>" + date.toDateString() + "<br> <b>" + "Cases: </b>" + d.value)
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");})
        .on("mouseout", function(d) {	
            d3.select(this).transition().duration(500).attr("fill", "#69b3a2");	
            div.transition()		
            .duration(500)		
            .style("opacity", 0);});

    svg4.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .attr('fill', 'aliceblue')
        .text("Week");

    svg4.append("text")
        .attr("text-anchor", "end")
        .attr('fill', 'aliceblue')
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+10)
        .attr("x", -margin.top)
        .text("New deaths")

    svg4.append("circle")
        .attr("cx",190)
        .attr("cy",130)
        .attr("r", 6)
        .style("fill", "#69b3a2")

    svg4.append("text")
        .attr("x", 200)
        .attr("y", 130)
        .text("New deaths per day")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
        .attr('fill', 'aliceblue')

});

d3.csv("data/illinois.csv",

    function(d){
        return { date : d3.timeParse("%Y%m%d")(d.date), value : +d.totalTestResultsIncrease }
    },

    function(data) {

    let x3 = d3.scaleTime()
               .domain(d3.extent(data, function(d) { return d.date; }))
               .range([ 0, width ]);

    svg5.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisBottom(x3));

    let y3 = d3.scaleLinear()
        .domain( [0, 80000])
        .range([ height, 0 ]);

    svg5.append("g")
        .attr('class', 'axisW')
        .attr('stroke', 'aliceblue')
        .call(d3.axisLeft(y3));

    svg5.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x3(d.date) })
        .y(function(d) { return y3(d.value) }))

    svg5.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x3(d.date) } )
        .attr("cy", function(d) { return y3(d.value) } )
        .attr("r", 3)
        .attr("fill", "#69b3a2")
        .on('mouseover', function (d){
            d3.select(this).attr("fill", "red");
            div.transition().duration(200).style("opacity", .9);
            date = new Date(d.date);
            div.html("<b>" + "Date: </b>" + date.toDateString() + "<br> <b>" + "Tests: </b>" + d.value)
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");})
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(500).attr("fill", "#69b3a2");
            div.transition()		
            .duration(500)		
            .style("opacity", 0);});

    svg5.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .attr('fill', 'aliceblue')
        .text("Week");

    svg5.append("text")
        .attr("text-anchor", "end")
        .attr('fill', 'aliceblue')
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+10)
        .attr("x", -margin.top)
        .text("New tests")

    svg5.append("circle")
        .attr("cx",190)
        .attr("cy",130)
        .attr("r", 6)
        .style("fill", "#69b3a2")

    svg5.append("text")
        .attr("x", 200)
        .attr("y", 130)
        .text("New tests per day")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
        .attr('fill', 'aliceblue')

});