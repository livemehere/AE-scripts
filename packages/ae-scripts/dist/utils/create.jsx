function hexToArr(color) {
    var hex = color.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
}

var DEFAULT_FPS = 60;
var DEFAULT_PIXEL_ASPECT = 1;
function clearAllCompositions() {
    app.beginUndoGroup("Clear All Compositions");
    var project = app.project;
    var numItems = project.numItems;
    for (var i = numItems; i >= 1; i--) {
        var item = project.item(i);
        if (item instanceof CompItem) {
            item.remove();
        }
    }
    app.endUndoGroup();
}
function createComposition(opts) {
    app.beginUndoGroup("Create New Composition");
    var name = opts.name, _a = opts.size, width = _a[0], height = _a[1], duration = opts.duration, pixelAspect = opts.pixelAspect, fps = opts.fps;
    var comp = app.project.items.addComp(name, width, height, pixelAspect !== null && pixelAspect !== void 0 ? pixelAspect : DEFAULT_PIXEL_ASPECT, duration, fps !== null && fps !== void 0 ? fps : DEFAULT_FPS);
    app.endUndoGroup();
    return comp;
}
function addTextLayer(comp, opts) {
    var _a;
    app.beginUndoGroup("Add Text Layer");
    var name = opts.name, position = opts.position, startTime = opts.startTime, endTime = opts.endTime, text = opts.text, fontSize = opts.fontSize, fontFamily = opts.fontFamily, color = opts.color, stroke = opts.stroke, strokeColor = opts.strokeColor, justification = opts.justification, leading = opts.leading, strokeOverFill = opts.strokeOverFill;
    var layer = comp.layers.addText(text);
    layer.name = name;
    if (position) {
        layer.position.setValue(position);
    }
    if (startTime) {
        layer.inPoint = startTime;
    }
    if (endTime) {
        layer.outPoint = endTime;
    }
    var textProp = layer.property("Source Text");
    var textDocument = textProp.value;
    textDocument.fontSize = fontSize !== null && fontSize !== void 0 ? fontSize : 50;
    textDocument.font = fontFamily !== null && fontFamily !== void 0 ? fontFamily : "Arial";
    if (leading) {
        textDocument.leading = leading;
    }
    if (color) {
        textDocument.fillColor = (_a = hexToArr(color)) !== null && _a !== void 0 ? _a : [1, 1, 1];
    }
    if (justification) {
        textDocument.justification = justification;
    }
    if (stroke) {
        textDocument.applyStroke = true;
        textDocument.strokeWidth = stroke;
        textDocument.strokeColor = strokeColor ? hexToArr(strokeColor) : [0, 0, 0];
    }
    textDocument.strokeOverFill = strokeOverFill !== null && strokeOverFill !== void 0 ? strokeOverFill : false;
    textProp.setValue(textDocument);
    app.endUndoGroup();
    return layer;
}

export { addTextLayer, clearAllCompositions, createComposition };
