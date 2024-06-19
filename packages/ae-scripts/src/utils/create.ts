import { CompositionOptions, TextLayerOptions } from "./types";
import { hexToArr } from "./convert";

const DEFAULT_FPS = 60;
const DEFAULT_PIXEL_ASPECT = 1;

export function clearAllCompositions(): void {
  app.beginUndoGroup("Clear All Compositions");

  const project = app.project;
  const numItems = project.numItems;

  for (let i = numItems; i >= 1; i--) {
    const item = project.item(i);
    if (item instanceof CompItem) {
      item.remove();
    }
  }
  app.endUndoGroup();
}

export function createComposition(opts: CompositionOptions) {
  app.beginUndoGroup("Create New Composition");
  const {
    name,
    size: [width, height],
    duration,
    pixelAspect,
    fps,
  } = opts;
  const comp = app.project.items.addComp(
    name,
    width,
    height,
    pixelAspect ?? DEFAULT_PIXEL_ASPECT,
    duration,
    fps ?? DEFAULT_FPS,
  );
  app.endUndoGroup();
  return comp;
}

export function addTextLayer(comp: CompItem, opts: TextLayerOptions) {
  app.beginUndoGroup("Add Text Layer");
  const {
    name,
    position,
    startTime,
    endTime,
    text,
    fontSize,
    fontFamily,
    color,
    stroke,
    strokeColor,
    justification,
    leading,
    strokeOverFill,
  } = opts;

  const layer = comp.layers.addText(text);
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

  const textProp = layer.property("Source Text") as TextDocumentProperty;
  const textDocument = textProp.value;
  textDocument.fontSize = fontSize ?? 50;
  textDocument.font = fontFamily ?? "Arial";

  if (leading) {
    textDocument.leading = leading;
  }

  if (color) {
    textDocument.fillColor = hexToArr(color) ?? [1, 1, 1];
  }

  if (justification) {
    textDocument.justification = justification;
  }

  if (stroke) {
    textDocument.applyStroke = true;
    textDocument.strokeWidth = stroke;
    textDocument.strokeColor = strokeColor ? hexToArr(strokeColor) : [0, 0, 0];
  }
  textDocument.strokeOverFill = strokeOverFill ?? false;

  textProp.setValue(textDocument);
  app.endUndoGroup();
  return layer;
}
