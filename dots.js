let width = 512;
let height = 512;
let currentColor = "#000000";
let duration = 1000;
let constraints = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
}
let mouseClickPositions = [];
let isReplay = false;
let inter;

setConstraints();

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
        addMouseClickPosition(event);
        split(d3.select(this));
    })
    .attr("r", 0)
    .transition()
    .duration(duration)
    .attr("r", width / 2);

function split(circle) {
    let details = {
        cx: parseInt(circle.attr("cx")),
        cy: parseInt(circle.attr("cy")),
        r: parseInt(circle.attr("r")),
        color: circle.attr("fill")
    }

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
            .attr("fill", currentColor)
            .on("click", function (d) {
                if (checkSize(details.r)) {
                    addMouseClickPosition(event);
                    split(d3.select(this));
                }
            })
            .attr("r", 0)
            .transition()
            .duration(duration)
            .attr("r", details.r / 2);
    }
}

function checkSize(r) {
    return r / 2 > width / 256;
}

function backgroundColorChange() {
    let newColor = d3.select("#backgroundColor").property("value");
    d3.select("body").style("background-color", newColor);
}

function drawingColorChange() {
    currentColor = d3.select("#drawingColor").property("value");
}

function setConstraints() {
    constraints.startX = getStartingPosition(document.getElementById("dots")).x;
    constraints.startY = getStartingPosition(document.getElementById("dots")).y + 30;
    constraints.endX = constraints.startX + 512;
    constraints.endY = constraints.startY + 512 + 30;
}

function addMouseClickPosition(data) {
    if (!isReplay) {
        let position = {
            x: data.clientX - constraints.startX,
            y: data.clientY - constraints.startY,
            color: currentColor
        };
        mouseClickPositions.push(position);
    }
}

function getStartingPosition(element) {
    for (var lx = 0, ly = 0;
        element != null;
        lx += element.offsetLeft,
        ly += element.offsetTop,
        element = element.offsetParent);
    return {
        x: lx,
        y: ly
    };
}

function changeButtonState(change) {
    if (change) {
        document.getElementById("replayButton").disabled = true;
        document.getElementById("drawButton").disabled = true;
    } else {
        document.getElementById("replayButton").disabled = false;
        document.getElementById("drawButton").disabled = false;
    }

}

function removeAllCircles() {
    d3.selectAll("circle").transition()
        .duration(duration)
        .attr("r", 0)
        .style("opacity", 0)
        .remove();
}

function setInitialCircle(type) {
    svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill-opacity", 1)
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#000000")
        .on("click", function (d) {
            addMouseClickPosition(event);
            split(d3.select(this));
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", width / 2);
    if (type == "replay") {
        console.log(d3.selectAll("circle"));
        d3.selectAll("circle")
            .on("end", function () {
                inter = setInterval(playReplay, 1500)
            });
    }
}

function replay(replaying) {
    isReplay = true;
    changeButtonState(true);

    removeAllCircles();

    setInitialCircle("replay");

}

function playReplay() {
    if (isReplay && mouseClickPositions.length > 0) {
        let svgPosition = getStartingPosition(document.getElementById("dots"));
        let x = svgPosition.x + mouseClickPositions[0].x;
        let y = svgPosition.y + mouseClickPositions[0].y;
        let el = document.elementFromPoint(x, y);
        let ev = new MouseEvent("click",
            {
                clientX: x,
                clientY: y,
                bubbles: true
            });
        currentColor = mouseClickPositions[0].color;
        el.dispatchEvent(ev);
        mouseClickPositions.shift();
    }
    if (mouseClickPositions.length == 0) {
        clearInterval(inter);
        changeButtonState(false);
    }
}

function refresh() {

}


let eyeOfSouron = [
    {
        x: 256,
        y: 256,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    },
    {
        x: 10,
        y: 10,
        color: "ffffff"
    }
];