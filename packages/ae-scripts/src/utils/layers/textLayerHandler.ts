import { getAlignEnum, hexToNumArr } from "../parser";

type FontOptions = {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  leading?: number;
  color?: string;
  justification?: "left" | "center" | "right";
  stroke?: {
    color: string;
    width: number;
    overFill?: boolean;
  };
  applyFill?: boolean;
  tracking?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  anchorPoint?: [number, number];
};

export function getRect(layer: TextLayer, time = 0) {
  return layer.sourceRectAtTime(time, false);
}

export function setTextLayerHelper(layer: TextLayer, opts: FontOptions) {
  app.beginUndoGroup("Set Text Layer Font");
  const textDocumentProperty = layer.property(
    "Source Text",
  ) as TextDocumentProperty;
  const textDocument = textDocumentProperty.value;
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
    textDocument.strokeOverFill = opts.stroke.overFill ?? false;
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
