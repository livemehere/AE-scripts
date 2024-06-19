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

export { getAlignEnum, hexToNumArr };
