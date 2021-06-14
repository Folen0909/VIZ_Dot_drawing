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
let isDrawing = false;
let inter;
let tempData;

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
    .on("click", function () {
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
            .on("click", function () {
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
    constraints.startY = getStartingPosition(document.getElementById("dots")).y;
    constraints.endX = constraints.startX + 512;
    constraints.endY = constraints.startY + 512;
}

function addMouseClickPosition(data) {
    if (!isDrawing) {
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
        d3.selectAll("input").each(function(d,i) { this.disabled = true; });
        d3.selectAll("button").each(function(d,i) { this.disabled = true; });
    }
    else {
        d3.selectAll("input").each(function(d,i) { this.disabled = false; });
        d3.selectAll("button").each(function(d,i) { this.disabled = false; });
    }
}

function removeAllCircles() {
    d3.selectAll("circle").transition()
        .duration(duration)
        .attr("r", 0)
        .style("opacity", 0)
        .remove();
}

// is there a way to simplify this, and by that I mean how only difference is on("end") listener
// I tried couple of things but non worked
// tried creating circle like in else statement and then check for type and add on listener
// but it is not working, in inspector I can find listener, but it is not working

function setInitialCircle(type) {
    if (type == "replay" || type == "draw") {
        if (type == "replay") {
            tempData = [...mouseClickPositions];
        }
        else {
            tempData = [...pacman];
        }
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill-opacity", 1)
            .attr("fill", "#FFFFFF")
            .attr("stroke", "#000000")
            .on("click", function () {
                addMouseClickPosition(event);
                split(d3.select(this));
            })
            .attr("r", 0)
            .transition()
            .duration(duration)
            .attr("r", width / 2)
            .on("end", function () {
                inter = setInterval(drawImage, 2000);
            });
    }
    else {
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
    }
}

function playFeature(type) {
    changeButtonState(true);
    removeAllCircles();
    isDrawing = true;
    if (type == "refresh") {
        isDrawing = false;
        mouseClickPositions = [];
        changeButtonState(false);
    }
    setInitialCircle(type);
}

function drawImage() {
    if (tempData.length > 0) {
        let svgPosition = getStartingPosition(document.getElementById("dots"));
        let x = svgPosition.x + tempData[0].x;
        let y = svgPosition.y + tempData[0].y;
        let el = document.elementFromPoint(x, y);
        let ev = new MouseEvent("click",
            {
                clientX: x,
                clientY: y,
                bubbles: true
            });
        currentColor = tempData[0].color;
        el.dispatchEvent(ev);
        tempData.shift();
    }
    else {
        clearInterval(inter);
        isDrawing = false;
        changeButtonState(false);
    }
}


// how to transfer to other file and load only when needed??
let pacman = [
    {
        x: 256,
        y: 256,
        color: "#FFFF00"
    },
    {
        x: 128,
        y: 128,
        color: "#FFFFFF"
    },
    {
        x: 128,
        y: 384,
        color: "#FFFFFF"
    },
    {
        x: 384,
        y: 128,
        color: "#FFFFFF"
    },
    {
        x: 384,
        y: 384,
        color: "#FFFFFF"
    },
    {
        x: 64,
        y: 192,
        color: "#FFFFFF"
    },
    {
        x: 192,
        y: 64,
        color: "#FFFFFF"
    },
    {
        x: 192,
        y: 192,
        color: "#FFFF00"
    },
    {
        x: 64,
        y: 320,
        color: "#FFFFFF"
    },
    {
        x: 192,
        y: 320,
        color: "#FFFF00"
    },
    {
        x: 192,
        y: 448,
        color: "#FFFFFF"
    },
    {
        x: 320,
        y: 64,
        color: "#FFFFFF"
    },
    {
        x: 320,
        y: 192,
        color: "#FFFF00"
    },
    {
        x: 448,
        y: 192,
        color: "#FFFFFF"
    },
    {
        x: 320,
        y: 320,
        color: "#FFFF00"
    },
    {
        x: 320,
        y: 448,
        color: "#FFFFFF"
    },
    {
        x: 448,
        y: 320,
        color: "#FFFFFF"
    },
    //THIRD
    {
        x: 96,
        y: 160,
        color: "#FFFF00"
    },
    {
        x: 160,
        y: 96,
        color: "#FFFF00"
    },
    {
        x: 224,
        y: 96,
        color: "#FFFF00"
    },
    {
        x: 288,
        y: 96,
        color: "#FFFF00"
    },
    {
        x: 352,
        y: 96,
        color: "#FFFF00"
    },
    {
        x: 416,
        y: 160,
        color: "#FFFF00"
    },
    {
        x: 416,
        y: 224,
        color: "#FFFF00"
    },
    {
        x: 416,
        y: 288,
        color: "#FFFF00"
    },
    {
        x: 416,
        y: 352,
        color: "#FFFF00"
    },
    {
        x: 352,
        y: 416,
        color: "#FFFF00"
    },
    {
        x: 288,
        y: 416,
        color: "#FFFF00"
    },
    {
        x: 224,
        y: 416,
        color: "#FFFF00"
    },
    {
        x: 160,
        y: 416,
        color: "#FFFF00"
    },
    {
        x: 96,
        y: 352,
        color: "#FFFF00"
    },
    {
        x: 160,
        y: 288,
        color: "#FFFFFF"
    },
    //---- 7
    {
        x: 160,
        y: 224,
        color: "#FFFFFF"
    },
    {
        x: 224,
        y: 288,
        color: "#FFFF00"
    },
    {
        x: 224,
        y: 224,
        color: "#FFFF00"
    },
    {
        x: 207,
        y: 271,
        color: "#FFFFFF"
    },
    {
        x: 207,
        y: 239,
        color: "#FFFFFF"
    },
    {
        x: 79,
        y: 176,
        color: "#FFFFFF"
    },
    {
        x: 79,
        y: 144,
        color: "#FFFFFF"
    },
    {
        x: 144,
        y: 79,
        color: "#FFFFFF"
    },
    {
        x: 176,
        y: 79,
        color: "#FFFFFF"
    },
    {
        x: 334,
        y: 79,
        color: "#FFFFFF"
    },
    {
        x: 367,
        y: 79,
        color: "#FFFFFF"
    },
    {
        x: 431,
        y: 143,
        color: "#FFFFFF"
    },
    {
        x: 431,
        y: 176,
        color: "#FFFFFF"
    },
    {
        x: 431,
        y: 335,
        color: "#FFFFFF"
    },
    {
        x: 431,
        y: 367,
        color: "#FFFFFF"
    },
    {
        x: 367,
        y: 431,
        color: "#FFFFFF"
    },
    {
        x: 336,
        y: 431,
        color: "#FFFFFF"
    },
    {
        x: 176,
        y: 431,
        color: "#FFFFFF"
    },
    {
        x: 144,
        y: 430,
        color: "#FFFFFF"
    },
    {
        x: 79,
        y: 370,
        color: "#FFFFFF"
    },
    {
        x: 79,
        y: 335,
        color: "#FFFFFF"
    }
];
