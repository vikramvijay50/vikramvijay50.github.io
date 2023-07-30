
var svg = d3.select("svg"), 
margin = 200, 
width = svg.attr("width") - margin, 
height = svg.attr("height") - (margin + 100); 
 
var xScale = d3.scaleBand().range([0, width]).padding(0.5), 
yScale = d3.scaleLinear().range([height, 0]); 
 
var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")"); 

d3.csv("../data/bestSellingPublishers.csv").then(function (data) { 
xScale.domain( data.map(function (d) { return d.Publisher; })); 
yScale.domain([0, 120000000]); 

svg 
.append("text") 
.attr("transform", "translate(100,0)") 
.attr("x", 200) 
.attr("y", 50) 
.attr("font-size", "15px")
.attr("stroke", "black") 
.text("Publisher");
 
g.append("g") 
.attr("transform", "translate(0," + height + ")") 
.call(d3.axisBottom(xScale))
.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
 
g.append("g") 
.call(d3.axisLeft(yScale)) 
.append("text") 
.attr("transform", "rotate(-90)") 
.attr("x", -200) 
.attr("y", 5) 
.attr("dy", "-5.1em") 
.attr("text-anchor", "end") 
.attr("stroke", "black") 
.attr("font-size", "15px") 
.text("Copies Sold"); 

const tooltip = d3.select('#tooltip')
  .attr('class', 'tooltip')
  .style('opacity', 0)
  .style('background', 'gray')
  .style('border-radius', '4px')
  .style('color', '#fff');

function onMouseOver(d, i){
    tooltip.style('opacity', 0.9).html("Publisher:" + d.Publisher + "<br>" 
                                        + "Total Copies Sold:" + d.Copies_sold)
    d3.select(this).attr('class', 'highlight')
    d3.select(this)
        .transition()
        .duration(200)
        .attr("fill", "green")
}

function onMouseMove(d, i){
    var x = d3.event.x,
    y = d3.event.y;
  tooltip.style('left',  x + 'px').style('top', y-65 + "px")
}

function onMouseout(d, i){
    tooltip.style('opacity', 0);
    d3.select(this).attr('class', 'highlight')
    d3.select(this)
        .transition()
        .attr("fill", "black")
}

const annotations = [
  {
      note: {
        label: "Sony Interactive Entertainment has  the most best selling titles published with 45% of titles in this list",
      },
      x: 70,
      y: 21,
      dy: 15,
      dx: 20
  },
]

const makeAnnotations = d3.annotation()
.annotations(annotations)

g.append("g")
.call(makeAnnotations)
 
g.selectAll(".bar") 
.data(data) 
.enter() 
.append("rect") 
.attr("class", "bar") 
.attr("x", function (d) { 
return xScale(d.Publisher); 
}) 
.attr("y", function (d) { return yScale(d.Copies_sold); }) 
.attr("width", xScale.bandwidth()) 
.attr("height", function (d) { return height - yScale(d.Copies_sold); })
.on('mouseover', onMouseOver)
.on('mousemove', onMouseMove)
.on('mouseout', onMouseout)
});