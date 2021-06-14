<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title>Dots</title>
</head>

<body>
    <script src="https://d3js.org/d3.v6.min.js"></script>

    <div id="color-picker">
        <ul>
            <li>
                <label for="drawingColor">Pick drawing color:</label>
                <input type="color" id="drawingColor" name="drawingColor" 
                    onchange="drawingColorChange()" value="#000000">
            </li>
            <li>
                <label for="backgroundColor">Background color: </label>
                <input type="color" id="backgroundColor" name="backgroundColor" 
                    onchange="backgroundColorChange()" value="#D3D3D3">
            </li>
        </ul>
        <button id="replayButton" type="button" onclick='playFeature("replay")'>Replay</button>
        <button id="drawButton" type="button" onclick='playFeature("draw")'>Draw Pacman (takes about 2 min)</button>
        <button id="refreshButton" type="button" onclick='playFeature("refresh")'>Refresh</button>
    </div>
    <div id="dots">

    </div>

    <script src="dots.js"></script>
</body>

</html>