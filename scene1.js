document.addEventListener('DOMContentLoaded', function(e) {
var svg = d3.select("svg1"), 
margin = 200, 
width = svg.attr("width") - margin, 
height = svg.attr("height") - margin; 
 
svg 
.append("text") 
.attr("transform", "translate(100,0)") 
.attr("x", 200) 
.attr("y", 50) 
.attr("font-size", "20px") 
.text("Students' Marks in Final Exams"); 
 
var xScale = d3.scaleBand().range([0, width]).padding(0.5), 
yScale = d3.scaleLinear().range([height, 0]); 
 
var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")"); 
 
d3.csv("bestSellingPS4Games.csv").then(function (data) { 
xScale.domain( 
data.map(function (d) { 
return d.Game; 
}) 
); 
yScale.domain([ 
0, 
d3.max(data, function (d) { 
return d.Copies_sold; 
}), 
]); 
 
g.append("g") 
.attr("transform", "translate(0," + height + ")") 
.call(d3.axisBottom(xScale)) 
.append("text") 
.attr("y", height - 140) 
.attr("x", width - 400) 
.attr("text-anchor", "end") 
.attr("stroke", "black") 
.attr("font-size", "15px") 
.text("Students"); 
 
g.append("g") 
.call(d3.axisLeft(yScale)) 
.append("text") 
.attr("transform", "rotate(-90)") 
.attr("x", -80) 
.attr("y", 25) 
.attr("dy", "-5.1em") 
.attr("text-anchor", "end") 
.attr("stroke", "black") 
.attr("font-size", "15px") 
.text("Marks"); 
 
g.selectAll(".bar") 
.data(data) 
.enter() 
.append("rect") 
.attr("class", "bar") 
.attr("x", function (d) { 
return xScale(d.Game); 
}) 
.attr("y", function (d) { 
return yScale(d.Copies_sold); 
}) 
.attr("width", xScale.bandwidth()) 
.attr("height", function (d) { 
return height - yScale(d.Copies_sold); 
}); 
}); 
});