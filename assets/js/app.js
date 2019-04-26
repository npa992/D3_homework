// @TODO: YOUR CODE HERE!
var margin = {top: 10, right: 20, bottom: 90, left: 90},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top+5 + margin.bottom+20)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

   
var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);


svg.append("text")  
    .attr('class', 'axis')           
    .attr("transform",
        "translate(" + (width/2) + " ," + 
            (height + margin.top + 70) + ")")
    .style("text-anchor", "middle")
    .text("% in poverty").on('click');

svg.append("text")
    .attr('class', 'axis')
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% lacking healthcare"); 

svg.append("text")  
    .attr('class', 'axis')           
    .attr("transform",
    "translate(" + (width/2) + " ," + 
    (height + margin.top + 50) + ")")
    .style("text-anchor", "middle")
    .text("Age(median)");

svg.append("text")
    .attr('class', 'axis')
    .attr("transform", "rotate(-90)")
    .attr("y", 20 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% smoking");

svg.append("text")  
    .attr('class', 'axis')           
    .attr("transform",
    "translate(" + (width/2) + " ," + 
    (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("Household Income (median)");

svg.append("text")
    .attr('class', 'axis')
    .attr("transform", "rotate(-90)")
    .attr("y", 40 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% Obese");
      
//Read the data
d3.csv("assets/data/data.csv").then(function(response) {
    var data = [];
    response.forEach(x => {
        data.push({
            poverty: parseFloat(x.poverty),
            healthcare: parseFloat(x.healthcare),
            age: parseFloat(x.age),
            obesity: parseFloat(x.obesity),
            smokes: parseFloat(x.smokes),
            income: parseFloat(x.income),
            label: x.abbr
        })
    });

    console.log(data)

    var circles =   
        svg
        .append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr('r', 15)
        .style("fill", 'blue' )
        .style("opacity", "0.5")
        .attr("stroke", "white")
        .style("stroke-width", "2px");
        
    var text = 
        svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr("font-family", "sans-serif")
        .attr('stroke', 'white')
        .attr('font-size', "7.5")
        

        var x = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.poverty-1; }), d3.max(data, function (d) { return d.poverty+1; })])
            .range([ 5, width-5 ]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        var y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.healthcare-1; }), d3.max(data, function (d) { return d.healthcare+1; })])
            .range([ height-5, 5]);

        svg.append("g")
            .call(d3.axisLeft(y));



    circles.attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.healthcare); } )

    

    text
      .attr("x", function (d) { return x(d.poverty)-4; } )
      .attr("y", function (d) { return y(d.healthcare); } )
      .text(d => d.label)

      var tooltip = d3.select("#scatter")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "black")
.style("border-radius", "5px")
.style("padding", "10px")
.style("color", "white")

  var showTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html("state: " + d.label + 'br' + 'poverty:' + d.poverty + 'br' + 'healthcare: ' + d.healthcare)
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
}
var moveTooltip = function(d) {
    tooltip
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
}
var hideTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}


circles
.on("mouseover", showTooltip )
.on("mousemove", moveTooltip )
.on("mouseleave", hideTooltip )

    

  });



// circles
//       .attr("cx", function (d) { return x(d.age); } )
//       .attr("cy", function (d) { return y(d.smokes); } )

//     cirlces
//       .attr("cx", function (d) { return x(d.income); } )
//       .attr("cy", function (d) { return y(d.obesity); } )
      
//       text
//       .attr("x", function (d) { return x(d.age)-4; } )
//       .attr("y", function (d) { return y(d.smokes); } )
//       .attr(d => d.label)

//     text
//       .attr("x", function (d) { return x(d.income)-4; } )
//       .attr("y", function (d) { return y(d.obesity); } )
//       .text(d => d.label)