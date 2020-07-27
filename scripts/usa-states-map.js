
// Dimensions of the object.
let width = 900;
let height = 800;

// Define the SVG element.
let svg = d3.select('#slide2')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

// Define the tooltip object.
let tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-5, 0])
            .html(function(d) {
                let dataRow = stateId.get(d.properties.name);
                if (dataRow) {
                    return "<b>" + dataRow.states + "</b> <br>" + "<br> Total cases: " + dataRow.TotalCases + "<br> Total deaths: " + dataRow.TotalDeaths +
                    "<br> Cases last 7 days: " + dataRow.CasesInLast7Days + "<br> Cases per 100k: " + dataRow.RatePer100000 + "<br> Deaths per 100k: " + dataRow.Death_100k;
                } else {
                    return d.properties.name + ": No data.";
       }
  })

svg.call(tip);

// D3 geo object containing the map of the US.
let projection = d3.geo.albersUsa()
                       .scale(1200)
                       .translate([width / 2, height / 2]);

// D3 path object.
let path = d3.geo.path()
                 .projection(projection);

// Color map containing the range of colors from green to red. The domain was picked based on the min and max number of cases.
let colorMap = d3.scale.linear().range(["green", "yellow", "red"]).domain([1000, 50000, 500000]).interpolate(d3.interpolateLab);

// Initialize map to store states.
let stateId = d3.map();

// Load datasets. USA.json contains the geo data for the US map, US_MAP_DATA contains the cases per state.
queue().defer(d3.json, "data/USA.json")
       .defer(d3.csv, "data/US_MAP_DATA.csv", typeAndSet)
       .await(loaded);

// Process imported data.
function typeAndSet(d) {
    d.TotalCases = +d.TotalCases;
    stateId.set(d.states, d);
    return d;
}

// Return corresponding color based on the cases in a state.
function getCaseColor(d) {
    let dataRow = stateId.get(d.properties.name);
    if (dataRow) {
        return colorMap(dataRow.TotalCases);
    } else {
        return "#ccc";
    }
}

// Populates the map based on the loaded data.
function loaded(error, usa, TotalCases, TotalDeaths) {

    svg.selectAll('path.states')
       .data(topojson.feature(usa, usa.objects.units).features)
       .enter()
       .append('path')
       .attr('class', 'states')
       .attr('d', path)
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide)
       .attr('fill', function(d,i) {
            return getCaseColor(d);
        })
       .append("title");

    svg.append("g")
       .attr("class", "legendLinear")
       .attr('stroke', 'aliceblue')
       .attr("transform", "translate(20,20)");

    let legendLinear = d3.legend.color()
                                .shapeWidth(80)
                                .orient('horizontal')
                                .scale(colorMap);

    svg.select(".legendLinear")
       .call(legendLinear);

}