// set the dimensions and margins of the graph
var width = 650
    height = 650
    margin = 80

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin
var filterCheck = false
var totalSold = 180520000

// Create dummy data
var data = {"Action-adventure": 44020000, 
            "Action role-playing": 43800000, 
            "Action-adeventure survival horror":20000000, 
            "Action-adventure hack and slash":19500000, 
            "Action-adventure stealth":10830000,
            "Racing":10830000,
            "First-person/Third-person shooter":8420000,
            "Adventure":5500000,
            "First-person shooter":3400000,
            "Sports":3120000,
            "Platform":2500000,
            "Role-playing":2300000,
            "Role-playing Social Sim":2300000,
            "Platform beat 'em up":2000000,
            "Sandbox Survival":2000000};

var idDict = {"action-adventure":"Action-adventure", 
            "action_roleplaying":"Action role-playing", 
            "action-adventure_survival_horror":"Action-adeventure survival horror", 
            "action-adventure_hack_slash":"Action-adventure hack and slash", 
            "action-adventure_stealth":"Action-adventure stealth",
            "racing":"Racing",
            "first_third_person_shooter":"First-person/Third-person shooter",
            "adventure":"Adventure",
            "first_person_shooter":"First-person shooter",
            "sports":"Sports",
            "platform":"Platform",
            "role-playing":"Role-playing",
            "role-playing_social":"Role-playing Social Sim",
            "platform_beatup":"Platform beat 'em up",
            "sandbox_survival":"Sandbox Survival"};

function getData(){
  var newData = {};
  filterCheck = false;
  Object.assign(newData, data);
  params.forEach(function(param) {
    var id = idDict[param.id]
    if (!d3.select('#' + param.id).property('checked')) {
      delete newData[id];
      filterCheck = true;
    }
  });
  drawChart(newData);
}

function drawChart(data) {
  var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  const annotations = [
    {
        note: {
          label: "Action Game Genre titles take up 76% of all best selling titles",
        },
        x: 500,
        y: 152,
        dy: -15,
        dx: 20
    },
    {
        note: {
          label: "Racing is the next highest selling genre after the Action genres",
        },
        x: 82,
        y: 300,
        dy: 240,
        dx: 2
    }
  ]
  
  if (filterCheck == false){
    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
      .annotations(annotations)
    d3.select('svg').append("g")
      .call(makeAnnotations)
  }
  
  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);
  
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))
  // Now I know that group A goes from 0 degrees to x degrees and so on.
  
  // shape helper to build arcs:
  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

  const tooltip = d3.select('#tooltip')
  .attr('class', 'tooltip')
  .style('opacity', 0)
  .style('background', 'gray')
  .style('border-radius', '4px')
  .style('color', '#fff');

  function onMouseOver(d, i){
    tooltip.style('opacity', 0.9).html("Genre:" + d.data.key + "<br>" 
                                      + "Total Copies Sold:" + d.value)
    d3.select(this).transition().duration(100).style('stroke-width', '4px')
  }

  function onMouseMove(d, i){
    var x = d3.event.x,
          y = d3.event.y;
      tooltip.style('left',  x + 'px').style('top', y+10 + "px")
  }

  function onMouseout(d, i){
    tooltip.style('opacity', 0);
    d3.select(this).transition().duration(100).style('stroke-width', '2px')
  }
  
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on('mouseover', onMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseout', onMouseout);
}

function updateChart(){
  d3.selectAll("svg > *").remove();
  getData()
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

drawChart(data);