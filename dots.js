let width = 512;
let height = 512;
let newColor = "#FFFFFF";
let duration = 1000;
let history = [];

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
    .attr("fill-opacity", 1)
    .attr("fill", "#FFFFFF")
    .attr("stroke", "#000000")
    .on("click", function (d) {
        split(d3.select(this));
    })
    .attr("r", width / 2);

function split(circle) {
    let details = {
        cx: parseInt(circle.attr("cx")),
        cy: parseInt(circle.attr("cy")),
        r: parseInt(circle.attr("r")),
        color: circle.attr("fill")
    }

    history.push(details);

    circle.transition()
        .duration(duration)
        .attr("r", 0)
        .style("opacity", 0)
        .remove();

    delete circle;

    for (let i = 0; i < 4; i++) {
        svg.append("circle")
            .attr("cx", details.cx - (details.r / 2) * ((i == 0 || i == 1) ? 1 : -1))
            .attr("cy", details.cy - (details.r / 2) * ((i == 0 || i == 2) ? 1 : -1))
            .attr("fill-opacity", 1)
            .attr("fill", newColor)
            .on("click", function (d) {
                if (checkSize(details.r)) {
                    split(d3.select(this));
                }
            })
            .attr("r", 0)
            .transition()
            .duration(duration)
            .attr("r", details.r / 2);
    }
    console.log(d3.selectAll("circle"));
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
    console.log(d3.selectAll("circle")[0]);
}

function redo() {
    if (d3.selectAll("circle")[0].length > 1) {
        let circles = d3.selectAll("circle")[0];
        console.log(circles);
        for (let i = 1; i < 5; i++) {
            d3.select(circles[circles.length - i]).transition()
                .duration(duration)
                .attr("r", 0)
                .style("opacity", 0)
                .remove();
        }

        svg.append("circle")
            .attr("cx", history[history.length - 1].cx)
            .attr("cy", history[history.length - 1].cy)
            .attr("fill-opacity", 1)
            .attr("fill", newColor)
            .on("click", function (d) {
                if (checkSize(history[history.length - 1].r)) {
                    split(d3.select(this));
                }
            })
            .attr("r", 0)
            .transition()
            .duration(duration)
            .attr("r", history[history.length - 1].r);

        history.pop();
    }
}