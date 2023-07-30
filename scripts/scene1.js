var svg = d3.select("svg"), 
margin = 200, 
width = svg.attr("width") - margin, 
height = svg.attr("height") - (margin + 100); 
 
var xScale = d3.scaleBand().range([0, width]).padding(0.5), 
yScale = d3.scaleLinear().range([height, 0]); 

function getData(){
  d3.csv("../data/bestSellingPS4Games.csv").then(function (data) {
    params.forEach(function(param) {
      if (!d3.select('#' + param.id).property('checked')) {
        data = data.filter(d => d['GenreId'] != param.id);
      }
    });
    drawChart(data)
  });
}

function drawChart(data) {

  function onMouseOver(d, i){
    tooltip.style('opacity', 0.9).html("Game Title:" + d.Game + "<br>" 
                                        + "Copies Sold:" + d.Copies_sold + "<br>" 
                                        + "Genre:" + d.Genre + "<br>" 
                                        + "Developer:" + d.Developer + "<br>" 
                                        + "Publisher:" + d.Publisher)
    d3.select(this).attr('class', 'highlight')
    d3.select(this)
        .transition()
        .duration(200)
        .attr("fill", "green")
  }
  
  function onMouseMove(d, i){
    var x = d3.event.x,
        y = d3.event.y;
    tooltip.style('left',  x + 'px').style('top', y-120 + "px")
  }
  
  function onMouseout(d, i){
    tooltip.style('opacity', 0);
    d3.select(this).attr('class', 'highlight')
    d3.select(this)
        .transition()
        .attr("fill", "black")
  }
  var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")"); 
  xScale.domain( data.map(function (d) { return d.Game; })); 
  yScale.domain([0, 20000000]);
  svg 
  .append("text") 
  .attr("transform", "translate(100,0)") 
  .attr("x", 200) 
  .attr("y", 50) 
  .attr("font-size", "15px")
  .attr("stroke", "black") 
  .text("Game Title");
   
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
  .attr("x", -100) 
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
  
  const annotations = [
      {
          note: {
            label: "The three highest selling PS4 games are all Action-Adventure type games",
          },
          x: 72,
          y: 101,
          dy: -15,
          dx: 20
      },
      {
          note: {
            label: "The best selling non-Action genre game",
          },
          x: 215,
          y: 290,
          dy: -15,
          dx: 20
      }
  ]

  if (params.some(param => !d3.select('#' + param.id).property('checked'))) {
    // Do not add annotations
  } else {
    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
      .annotations(annotations)
    g.append("g")
      .call(makeAnnotations)
  }

  
  g.selectAll(".bar") 
  .data(data) 
  .enter() 
  .append("rect")
  .attr("class", "bar") 
  .attr("x", function (d) { 
  return xScale(d.Game); 
  }) 
  .attr("y", function (d) { return yScale(d.Copies_sold); }) 
  .attr("width", xScale.bandwidth()) 
  .attr("height", function (d) { return height - yScale(d.Copies_sold); })
  .on('mouseover', onMouseOver)
  .on('mousemove', onMouseMove)
  .on('mouseout', onMouseout)
}

function updateChart(){
  d3.selectAll("svg > *").remove();
  getData();
}

const params = [
  {
    id: "action-adventure",
  },
  {
    id: "action_roleplaying",
  },
  {
    id: "action-adventure_survival_horror",
  },
  {
    id: "action-adventure_hack_slash",
  },
  {
    id: "action-adventure_stealth",
  },
  {
    id: "racing",
  },
  {
    id: "first_third_person_shooter",
  },
  {
    id: "adventure",
  },
  {
    id: "first_person_shooter",
  },
  {
    id: "sports",
  },
  {
    id: "platform",
  },
  {
    id: "role-playing",
  },
  {
    id: "role-playing_social",
  },
  {
    id: "platform_beatup",
  },
  {
    id: "sandbox_survival",
  },
];

getData();