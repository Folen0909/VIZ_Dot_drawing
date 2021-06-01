let width = 512;
let height = 512;
let newColor = "#FFFFFF";
let duration = 1000;

let curentColor = d3.select("#current-color")
    .text(`Current color: ${newColor}.`);

let body = d3.select("body")
    .on("keydown", function () {
        switch (d3.event.keyCode) {
            case 81: switchColor(d3.select("#colorQ").property("value")); //Q
                break;
            case 87: switchColor(d3.select("#colorW").property("value")); //W
                break;
            case 69: switchColor(d3.select("#colorE").property("value")); //E
                break;
            case 82: switchColor(d3.select("#colorR").property("value")); //R
                break;
            case 84: switchColor(d3.select("#colorT").property("value")); //T
                break;
            default: switchColor("#FFFFFF");
                break;
        }
        console.log(d3.event.keyCode);
    });

let svg = d3.select("#dots")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let firstCircle = svg.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", width / 2)
    .attr("fill-opacity", 1)
    .attr("fill", "#FFFFFF")
    .attr("stroke", "#000000")
    .on("click", function (d) {
        split(d3.select(this));
    });

function split(circle) {
    let centerX = parseInt(circle.attr("cx"));
    let centerY = parseInt(circle.attr("cy"));
    let r = parseInt(circle.attr("r"));
    circle.transition()
        .duration(duration)
        .attr("r", 0)
        .style("opacity", 0)
        .remove();

    delete circle;

    svg.append("circle")
        .attr("cx", centerX - r / 2)
        .attr("cy", centerY - r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (checkSize(r)) {
                split(d3.select(this));
            }
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", r / 2);

    svg.append("circle")
        .attr("cx", centerX + r / 2)
        .attr("cy", centerY - r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (checkSize(r)) {
                split(d3.select(this));
            }
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", r / 2);

    svg.append("circle")
        .attr("cx", centerX - r / 2)
        .attr("cy", centerY + r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (checkSize(r)) {
                split(d3.select(this));
            };
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", r / 2);

    svg.append("circle")
        .attr("cx", centerX + r / 2)
        .attr("cy", centerY + r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (checkSize(r)) {
                split(d3.select(this));
            }
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", r / 2);
}

function checkSize(r) {
    return r / 2 > width / 256;
}

function switchColor(color) {
    newColor = color;
    curentColor.text(`Current color: ${color}.`);
}

function backgroundColorChange() {
    body.style("background-color", d3.select("#backgroundColor").property("value"));
}

function playback() {
    circles = d3.selectAll("circle")[0];
    console.log(circles);
}