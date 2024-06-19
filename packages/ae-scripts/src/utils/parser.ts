export function hexToNumArr(color: string): [number, number, number] {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export function getAlignEnum(align: string) {
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
