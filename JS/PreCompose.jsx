var layer1 = app.project.items[2].layers[1];


var inPoint = layer1.inPoint;
var outPoint = layer1.outPoint;
var comp = app.project.items[2].layers.precompose([1], "Wudongmin", true);
comp.displayStartTime = inPoint;
comp.layers[1].startTime = -inPoint;
comp.duration = outPoint - inPoint;
 app.project.items[2].layers[1].startTime = inPoint;