function exampleHistogram(data) {
    // var parsed = JSON.parse(data);
    var formatCount = d3.format("0,");
    var svg = d3.select("svg"),
        margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .domain([data[0][0].x0, data[0][data[0].length - 1].x1])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data[0], function(d) { return d.length; })])
        .range([height, 0]);

    var tip = d3.select(".tooltip")
    .style("opacity", 0)

    var bar = g.selectAll(".bar")
    .data(data[1])
    .enter()
    .append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })

    bar.append("rect")
        .attr("x", 1)
        .attr("width", 10)
        .attr("height", function(d) { return height - y(d.length); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", -20)
        .attr("x", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12")
        .text(function(d) { return formatCount(d.length); });
    
    bar.on('click', d => {
        var selected = d3.select(".tooltip").node();
        if(selected['style']['opacity'] == 0) {
            tip.transition()
            .duration(200)
            .style("opacity", 0.9);
            tip.html(h => {return makeGraph(d)})
        } else {
            tip.transition()
                .duration(500)
                .style("opacity", 0)
                .style("height", 0)
            tip.html("<br>")
        }

    })

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
}

function removeHistogram() {
    d3.select('svg').remove();
    d3.select(".tooltip").remove();

    d3.select('body')
        .append('svg')
        .attr("width","1000")
        .attr("height", "500")
        .attr("id", "Graph")
    d3.select("body")
        .append("div")
        .attr("class", "tooltip")
}

function makeGraph(data) {
    var keys = Object.keys(data[0]);
    var table = "<table class='table table-striped'>";
    var header = "<thead><tr>"
    var body ="<tbody>"

    for(let x = 0; x < keys.length; x++) {
        header += "<th>" + keys[x] + "</th>"
    }

    header += "</tr></thead>"

    for(let x = 0; x < data.length; x++) {
        body += "<tr>"
        for(let key = 0; key < keys.length; key++){
            body += "<td>" + data[x][keys[key]] + "</td>"
        }
        body += "</tr>"
    }
    body +="</tbody></table>"

    table += header + body;
    return table;
}