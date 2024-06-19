function hexToNumArr(color) {
    var hex = color.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
}
function getAlignEnum(align) {
    switch (align) {
        case "left":
            return ParagraphJustification.LEFT_JUSTIFY;
        case "center":
            return ParagraphJustification.CENTER_JUSTIFY;
        case "right":
            return ParagraphJustification.RIGHT_JUSTIFY;
        default:
            return ParagraphJustification.LEFT_JUSTIFY;
    }
}

function getRect(layer, time) {
    if (time === void 0) { time = 0; }
    return layer.sourceRectAtTime(time, false);
}
function setTextLayerHelper(layer, opts) {
    var _a;
    app.beginUndoGroup("Set Text Layer Font");
    var textDocumentProperty = layer.property("Source Text");
    var textDocument = textDocumentProperty.value;
    if (opts.text) {
        textDocument.text = opts.text;
    }
    if (opts.fontSize) {
        textDocument.fontSize = opts.fontSize;
    }
    if (opts.fontFamily) {
        textDocument.font = opts.fontFamily;
    }
    if (opts.leading) {
        textDocument.leading = opts.leading;
    }
    if (opts.color) {
        textDocument.fillColor = hexToNumArr(opts.color);
    }
    if (opts.justification) {
        textDocument.justification = getAlignEnum(opts.justification);
    }
    if (opts.tracking) {
        textDocument.tracking = opts.tracking;
    }
    if (opts.applyFill) {
        textDocument.applyFill = opts.applyFill;
    }
    if (opts.stroke) {
        textDocument.applyStroke = true;
        textDocument.strokeWidth = opts.stroke.width;
        textDocument.strokeColor = hexToNumArr(opts.stroke.color);
        textDocument.strokeOverFill = (_a = opts.stroke.overFill) !== null && _a !== void 0 ? _a : false;
    }
    textDocumentProperty.setValue(textDocument);
    if (opts.scale) {
        layer.scale.setValue([opts.scale, opts.scale]);
    }
    if (opts.rotation) {
        layer.rotation.setValue(opts.rotation);
    }
    if (opts.opacity) {
        layer.opacity.setValue(opts.opacity);
    }
    if (opts.anchorPoint) {
        layer.anchorPoint.setValue(opts.anchorPoint);
    }
    app.endUndoGroup();
}

export { getRect, setTextLayerHelper };
