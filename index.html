const windowWidth = $(window).width();
const windowHeight = $(window).height();

$(window).resize(function () {
  if (
    windowWidth != $(window).width() ||
    windowHeight != $(window).height()
  ) {
    location.reload();
    return;
  }
});

let isSmallScreen = false;

if (windowWidth <= 550) {
  isSmallScreen = true;
}


const main = d3.select("body");
const scrolly = d3.selectAll(".scroller");
const figure = d3.selectAll(".chart");
const article = d3.selectAll(".scroll-graphic");
const step = d3.selectAll(".scene");

// initialize the scrollama
const scroller = scrollama();


// console.log(figure.node().getBoundingClientRect())
let width = figure.node().getBoundingClientRect().width;
let height = figure.node().getBoundingClientRect().height;


let margin = {
    "top": 35,
    "left": 55,
    "bottom": 65,
    "right": 30
}

if (windowWidth <= 550) {
     margin = {
        "top": 15,
        "left": 35,
        "bottom": 25,
        "right": 10
    }
  }
  

//svg
const svg = d3.select("#chart1").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
const bg = svg.append('rect')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "none")
    .attr("opacity", 0.3)


// barData

const barData = [{
        "category": "Net zero",
        "subcategory": "current",
        "value": 131
    }, {
        "category": "Net zero",
        "subcategory": "needs",
        "value": 203
    },
    {
        "category": "NDC",
        "subcategory": "current",
        "value": 131
    },
    {
        "category": "NDC",
        "subcategory": "needs",
        "value": 404
    }
]

const currentData = barData.filter(d => d.subcategory === "current")
const needsData = barData.filter(d => d.subcategory === "needs")

const nestedData = d3.group(barData, d => d.category);

// Convert nested data into a suitable format for d3.stack
const categories = Array.from(nestedData.keys());
const subcategories = Array.from(new Set(barData.map(d => d.subcategory)));

const stackedData = categories.map(category => {
    const categoryData = nestedData.get(category);
    const result = {
        category
    };
    subcategories.forEach(subcategory => {
        const subData = categoryData.find(d => d.subcategory === subcategory);
        result[subcategory] = subData ? subData.value : 0;
    });
    return result;
});

const x = d3.scaleBand()
    .domain(categories)
    .range([0, width])
    .padding(0.6);

const y = d3.scaleLinear()
    .domain([0, d3.max(stackedData, d => d3.sum(subcategories, sub => d[sub]))])
    .nice()
    .range([height, 0]);

const color = d3.scaleOrdinal()
    .domain(subcategories)
    .range(["#496f9c", "#7da9c9"]);

const stack = d3.stack()
    .keys(subcategories)
    .value((d, key) => d[key]);

const series = stack(stackedData);



let xAxis = d3.axisBottom(x).ticks(10);
// .tickFormat(formatYear);
let yAxis = d3.axisLeft(y).ticks(5);


const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
const gImage = svg.append("g");
let gText = svg.append("g").attr("id", "text").raise()
const gMap = svg.append("g");

//IMAGE

gImage.append("image")
    .attr("id", "sankey")
    .style("opacity", 1)
    .attr("xlink:href", "./img/sankey.png") // Replace with your image URL
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet");



// MAP

const mapData = [{"region":"Central Asia and Eastern Europe","value":0.22,"lat":49,"lon":60},{"region":"East Asia and Pacific","value":1.18,"lat":0,"lon":140},{"region":"Latin America & Caribbean","value":0.23,"lat":-15,"lon":-60},{"region":"Middle East and North Africa","value":0.71,"lat":25,"lon":30},{"region":"Other Oceania","value":0.05,"lat":-15,"lon":170},{"region":"South Asia","value":0.19,"lat":20,"lon":80},{"region":"Sub-Saharan Africa","value":0.41,"lat":-5,"lon":20},{"region":"Transregional","value":0.93,"lat":-50,"lon":20},{"region":"US & Canada","value":0.78,"lat":54,"lon":-100},{"region":"Western Europe","value":7.23,"lat":50,"lon":10}]

function loadJSON(filePath) {
            const request = new XMLHttpRequest();
            request.open("GET", filePath, false); // `false` makes the request synchronous
            request.send(null); //method sends the request to the server, null is passed as an argument because GET requests do not have a body
            if (request.status === 200) {
                return JSON.parse(request.responseText);
            }
        }

const worldmap = loadJSON("./data/land.geojson");
const SAMap = loadJSON("./data/south-africa.geojson");

const projection = d3.geoNaturalEarth1()
projection.fitSize([width, height+100], worldmap);
const path = d3.geoPath()
    .projection(projection);

const circleScale = d3.scaleLinear().domain([0.1,10]).range([5,50]);

g.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .style("opacity",0)

g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .style("opacity",0)

g.selectAll(".x-axis").selectAll(".tick").selectAll("text").style("font-size",16)

g.append("text")
    .attr("id","unit")
    .attr("x",x(0)+30)
    .attr("y",y(0)+20)
    .text("(In billion p.a.)")
    .style("opacity",0)


gMap.selectAll("path.land")
            .data(worldmap.features)
            .join("path")
            .attr("d", path)
            .attr("class", "land")
            .attr("fill", "#e5e4e3")
            .style("opacity",0)

gMap.selectAll("path.SA")
            .data(SAMap.features)
            .join("path")
            .attr("d", path)
            .attr("class", "SA")
            .attr("fill", "#7da9c9")
            .style("opacity",0)

gMap.selectAll("circle.mapPoints")
      .data(mapData)
      .join("circle")
      .attr("class","mapPoints")
      .attr("cx",d=>projection([+d.lon, +d.lat])[0])
      .attr("cy",d=>projection([+d.lon, +d.lat])[1])
      .attr("r", d=>circleScale(d.value))
      .attr("fill", "#7da9c9")
      .style("opacity",0)

gMap.selectAll("text.mapText")
      .data(mapData)
      .join("text")
      .attr("class","mapText")
      .attr("x",d=>projection([+d.lon, +d.lat])[0])
      .attr("y",d=>projection([+d.lon, +d.lat])[1])
      .attr("fill", "black")
      .style("font-size",14)
      .text(d=>d.region)
      .style("opacity",0)

  gMap.selectAll("text.mapTextVal")
        .data(mapData)
        .join("text")
        .attr("class","mapTextVal")
        .attr("x",d=>projection([+d.lon, +d.lat])[0])
        .attr("y",d=>projection([+d.lon, +d.lat])[1]+20)
        .attr("fill", "black")
        .style("font-weight",700)
        .text(d=>d.region === "Transregional"?`${d.value} billion p.a.`:d.value)
        .style("opacity",0)


let barCalled = false;
let bar2Called = false;

function drawBars(){

  barCalled = true;
  g.select("#unit").style("opacity", isSmallScreen?0:1)
  g.append("g")
      .selectAll("g.rects")
      .data(series)
      .join("g")
      .attr("class", "rects")
      .attr("fill", d => color(d.key))
      .attr("class", d => `layer layer-${d.key}`)
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("x", d => x(d.data.category))
      .attr("y", height) // Initially draw all rects at the bottom
      .attr("height", 0) // with height 0
      .attr("width", x.bandwidth())
      .attr("class", "bar")
      .style("opacity", 1)

  // Initially animate only the first subcategory
  g.selectAll(".layer-current .bar")
      .style("opacity", 1)
      .transition()
      .duration(300)
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .on("end", function() {
          gText.selectAll("text.current")
              .data(currentData)
              .join("text")
              .attr("class", "current")
              .attr("x", d => x(d.category) + x.bandwidth() / 2 + margin.left)
              .attr("y", d => y(d.value/2)+margin.top)
              .attr("text-anchor", "middle")
              .text(d => d.value)
              .style("opacity", 1)
              .style("font-size",20)
              .style("font-weight",700)
              .attr("fill","white")
      })
}

function drawBars2(){

  bar2Called = true;
  g.select("#unit").style("opacity", isSmallScreen?0:1)
  g.selectAll(`.layer-needs .bar`)
      .attr("y", d => y(d[0])) // Set y to the base of the previous stack
      .transition()
      .duration(300)
      .attr("height", d => y(d[0]) - y(d[1])) // Animate the height
      .attr("y", d => y(d[1])) // Animate y to the correct position
      .on("end", function() {
          gText.selectAll("text.needs")
              .data(needsData)
              .join("text")
              .attr("class", "needs")
              .attr("x", d => x(d.category) + x.bandwidth() / 2 + margin.left)
              .attr("y", d => y(d.value/2+131)+margin.top)
              .attr("text-anchor", "middle")
              .text(d => d.value)
              .style("opacity", isSmallScreen?0:1)
              .style("font-size",20)
              .style("font-weight",700)
              .attr("fill","white")
      })
}

// scrollama event handlers
function handleStepEnter(response) {

    if (response.index == 0) {

        if (response.direction == "up") {

            gImage.select("#sankey")
                .transition()
                .duration(300)
                .style("opacity", 1)

            g.selectAll("path").style("opacity", 0)
            g.selectAll("rect").style("opacity", 0)
            g.select("#unit").style("opacity", 0)
            svg.selectAll("text").style("opacity", 0)


        }
    }

    if (response.index == 1) {

        if (response.direction == "down") {

          g.select(".x-axis").style("opacity",1)
          g.select(".y-axis").style("opacity",1)
          g.selectAll("path").style("opacity", 1)
          g.selectAll("text").style("opacity", 1)

            gImage.select("#sankey")
                .transition()
                .duration(300)
                .style("opacity", 0)

            drawBars();




        }


        if (response.direction == "up") {
          g.selectAll(`.layer-needs .bar`)
              .attr("y", d => y(d[1])) // Set y to the base of the previous stack
              .transition()
              .duration(300)
              .attr("height", 0) // Animate the height
              .attr("y", d => y(d[0]))


          svg.selectAll("text.needs").style("opacity", 0)


        }

    }


    if (response.index == 2) {

        if (response.direction == "down") {

            if(!barCalled){
              drawBars()
            }

            // g.selectAll(`.layer-needs .bar`).style("opacity",1)
            drawBars2()
            if(isSmallScreen){
              setTimeout(function() {
                gText.selectAll("text.needs").style("opacity",1).raise()
              }, 350);
            }
            gImage.select("#sankey").style("opacity", 0)
            g.selectAll("path").style("opacity", 1)
            g.selectAll("rect").style("opacity", 1)
            g.select(".x-axis").style("opacity",1)
            g.select(".y-axis").style("opacity",1)


        }

        if (response.direction == "up") {

         if(isSmallScreen){
           gText.selectAll("text.needs").style("opacity",1)
         }

          g.selectAll("path").style("opacity", 1)
          g.selectAll("rect").style("opacity", 1)
          svg.selectAll("text").style("opacity", 1)
          g.select(".x-axis").style("opacity",1)
          g.select(".y-axis").style("opacity",1)
          g.select("#unit").style("opacity", isSmallScreen?0:1)
          
          gMap.selectAll(".SA").style("opacity",0)
          gMap.selectAll(".land").transition().duration(300).style("opacity",0)
          gMap.selectAll(".mapText").style("opacity",0)
          gMap.selectAll(".mapTextVal").style("opacity",0)
          gMap.selectAll(".mapPoints").transition().duration(300).style("opacity",0)
        }



    }

    if (response.index == 3) {

        if (response.direction == "down") {
          if(!barCalled){
            drawBars()
          }

          if(!bar2Called){
            drawBars2()
          }

          gMap.selectAll(".land").transition().duration(300).style("opacity",1)
          gMap.selectAll(".SA").style("opacity",1)
          svg.selectAll("text").style("opacity",0)

          g.selectAll("path").style("opacity", 0)
          g.selectAll("rect").style("opacity", 0)
          g.select(".x-axis").style("opacity",0)
          g.select(".y-axis").style("opacity",0)
          g.select("#unit").style("opacity", 0)
          gImage.select("#sankey").style("opacity", 0)

        }

        if (response.direction == "up") {
            gMap.selectAll(".SA").style("opacity",1)
            gMap.selectAll(".mapPoints").style("opacity",0)
            svg.selectAll("text").style("opacity",0)
            gMap.selectAll(".mapText").style("opacity",0)
            gMap.selectAll(".mapTextVal").style("opacity",0)
  

        }


    }


    if (response.index == 4) {

        if (response.direction == "down") {
          if(!barCalled){
            drawBars()
          }

          if(!bar2Called){
            drawBars2()
          }

          gMap.selectAll(".land").style("opacity",1)
          gMap.selectAll(".SA").style("opacity",0)
          gMap.selectAll(".mapPoints").attr("r",0).transition().duration(500).style("opacity",1).attr("r",d=>circleScale(d.value))
          svg.selectAll("text").style("opacity",0)
          gMap.selectAll(".mapText").transition().duration(300).style("opacity",windowWidth <= 750?0:1)
          gMap.selectAll(".mapTextVal").transition().duration(300).style("opacity",1)
          g.selectAll("path").style("opacity", 0)
          g.selectAll("rect").style("opacity", 0)
          g.select(".x-axis").style("opacity",0)
          g.select(".y-axis").style("opacity",0)
          g.select("#unit").style("opacity", 0)
          gImage.select("#sankey").style("opacity", 0)

        }


    }

}


function handleStepExit(response) {}

function init() {

    scroller
        .setup({
            step: ".scene",
            offset: 0.9,
            debug: false,
            progress: false
        })
        .onStepEnter(handleStepEnter);

}

init();
