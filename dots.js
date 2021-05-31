let width = 512;
let height = 512;
let newColor = "#000099";

let body = d3.select("body")
    .on("keydown", function () {
        switch (d3.event.keyCode) {
            case 82: newColor = "#990000";
                break;
            case 71: newColor = "#009900";
                break;
            case 66: newColor = "#000099";
                break;
            default: newColor = "#999999";
                break;
        }
        console.log(d3.event.keyCode);
    });

let canvas = d3.select("#dots")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let firstCircle = canvas.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", width / 2)
    .attr("fill-opacity", 1)
    .attr("fill", "#FFFFFF")
    .attr("stroke", "#000000")
    .on("click", function (d) {
        split(this);
    });


function split(circle) {
    console.log(canvas[0][0].children);

    let centerX = parseInt(circle.attributes.cx.value);
    let centerY = parseInt(circle.attributes.cy.value);
    let r = parseInt(circle.attributes.r.value);
    let color = circle.attributes.fill.value;

    circle.remove();
    delete circle;

    canvas.append("circle")
        .attr("cx", centerX - r / 2)
        .attr("cy", centerY - r / 2)
        .attr("r", r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (r / 2 > width / 32) {
                split(this);
            }
        });

    canvas.append("circle")
        .attr("cx", centerX + r / 2)
        .attr("cy", centerY - r / 2)
        .attr("r", r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (r / 2 > width / 32) {
                split(this);
            }
        });

    canvas.append("circle")
        .attr("cx", centerX - r / 2)
        .attr("cy", centerY + r / 2)
        .attr("r", r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (r / 2 > width / 32) {
                split(this);
            };
        });

    canvas.append("circle")
        .attr("cx", centerX + r / 2)
        .attr("cy", centerY + r / 2)
        .attr("r", r / 2)
        .attr("fill-opacity", 1)
        .attr("fill", newColor)
        .on("click", function (d) {
            if (r / 2 > width / 32) {
                split(this);
            }
        });
}
