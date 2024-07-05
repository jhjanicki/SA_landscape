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


const margin = {
    "top": 35,
    "left": 55,
    "bottom": 65,
    "right": 30
}


//svg
const svg = d3.select("#chart1").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
const bg = svg.append('rect')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#E7E6E6")
    .attr("opacity", 0.3)




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

console.log(series)



let xAxis = d3.axisBottom(x).ticks(10);
// .tickFormat(formatYear);
let yAxis = d3.axisLeft(y).ticks(5);


const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
const gImage = svg.append("g");



gImage.append("image")
    .attr("id", "sankey")
    .style("opacity", 1)
    .attr("xlink:href", "./img/sankey.png") // Replace with your image URL
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet");


let textG = svg.append("g").attr("id", "text").raise()




// scrollama event handlers
function handleStepEnter(response) {

    if (response.index == 0) {

        if (response.direction == "up") {

            gImage.select("#sankey")
                .transition()
                .duration(500)
                .style("opacity", 1)

            g.selectAll("path").style("opacity", 0)
            g.selectAll("rect").style("opacity", 0)

            svg.selectAll("text").style("opacity", 0)


        }
    }

    if (response.index == 1) {

        if (response.direction == "down") {

            gImage.select("#sankey")
                .transition()
                .duration(500)
                .style("opacity", 0)

            g.append("g")
                .attr("class", "y-axis")
                .call(yAxis);

            g.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height})`)
                .call(xAxis);



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
                .duration(1000)
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .on("end", function() {
                    textG.selectAll("text.current")
                        .data(currentData)
                        .join("text")
                        .attr("class", "current")
                        .attr("x", d => x(d.category) + x.bandwidth() / 2 + margin.left)
                        .attr("y", d => y(d.value) + 50)
                        .attr("text-anchor", "middle")
                        .text(d => d.value)
                        .attr("fill", "white")
                        .style("opacity", 1)
                })




        }


        if (response.direction == "up") {



        }

    }


    if (response.index == 2) {

        if (response.direction == "down") {

            g.selectAll(`.layer-needs .bar`)
                .attr("y", d => y(d[0])) // Set y to the base of the previous stack
                .transition()
                .duration(1000)
                .attr("height", d => y(d[0]) - y(d[1])) // Animate the height
                .attr("y", d => y(d[1])) // Animate y to the correct position
                .on("end", function() {
                    textG.selectAll("text.needs")
                        .data(needsData)
                        .join("text")
                        .attr("class", "needs")
                        .attr("x", d => x(d.category) + x.bandwidth() / 2 + margin.left)
                        .attr("y", d => y(d.value))
                        .attr("text-anchor", "middle")
                        .text(d => d.value)
                        .style("opacity", 1)
                })




        }



    }

    if (response.index == 3) {

        if (response.direction == "down") {



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