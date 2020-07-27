
// JS for the first slide.
// Maps used to fetch display names and range for the letiables.
let data_map = {'new_deaths': 'New Deaths', 'new_cases': 'New Cases', 'cases': 'Total Cases', 'deaths': 'Total Deaths'};
let case_domains = {'new_deaths': [0, 4000], 'new_cases': [0, 100000], 'cases': [0, 5000000], 'deaths': [0, 200000]};

// Set dimensions of the object.
let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 760 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Append SVG.
let svg = d3.select("#slide1")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom+20)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append tooltip.
let div = d3.select("#slide1")
            .append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

// Read and process the data. File included in the same directory.
d3.csv("data/us.csv", function(data) {

    // List of columns in the dataset.
    let allGroup = ["new_cases", "new_deaths", "cases", "deaths"]

    // Add options to the menu. The display name is fetched from the map above.
    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return data_map[d]; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // New cases plot is shown by default.
    update("new_cases");

    // Function to update the plot.
    function update(selectedGroup) {

        // Clears the current elements in SVG before creating the new plot based on user selection in the drop down.
        svg.selectAll("*").remove();

        // Parse date and value from the selected variable.
        let dataFilter = data.map(function(d){return {date: d3.timeParse("%Y-%m-%d")(d.date), value: +d[selectedGroup]} });
        
        // X axis.
        let x = d3.scaleTime()
                  .domain(d3.extent(dataFilter, function(d) { return d.date; }))
                  .range([ 0, width ]);

        // Y axis.
        let y = d3.scaleLinear()
                  .domain(case_domains[selectedGroup])
                  .range([ height, 0 ]);
        
        // Create the X axis.
        svg.append("g")
           .attr("transform", "translate(0," + height + ")")
           .attr('class', 'axisW')
           .attr('stroke', 'aliceblue')
           .call(d3.axisBottom(x));

        // Create the Y axis.
        svg.append("g")
           .attr('class', 'axisW')
           .attr('stroke', 'aliceblue')
           .call(d3.axisLeft(y));
    

        // Plot the points.
        svg.append("g")
           .selectAll("dot")
           .data(dataFilter)
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

        // Plot the line.
        svg.append("path")
           .datum(dataFilter)
           .attr("fill", "none")
           .attr("stroke", "#69b3a2")
           .attr("stroke-width", 1.5)
           .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) }))

        // Create the X axis label.
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", width)
           .attr("y", height + margin.top + 30)
           .attr('fill', 'aliceblue')
           .text("Month");

        // Create the Y axis label.
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("transform", "rotate(-90)")
           .attr("y", -margin.left+10)
           .attr('fill', 'aliceblue')
           .attr("x", -margin.top)
           .text(data_map[selectedGroup])


        // Create the legend.
        svg.append("circle")
           .attr("cx",200)
           .attr("cy",130)
           .attr("r", 6)
           .style("fill", "#69b3a2")

        svg.append("text")
           .attr("x", 220)
           .attr("y", 130)
           .text(data_map[selectedGroup])
           .style("font-size", "15px")
           .attr("alignment-baseline","middle")
           .attr('fill', 'aliceblue')

    }

    // Update chart when a new option is selected.
    d3.select("#selectButton").on("change", function(d) {
        let selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })

})
