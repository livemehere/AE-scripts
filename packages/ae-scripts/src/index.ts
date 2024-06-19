import { getRect, setTextLayerHelper } from "./utils/layers/textLayerHandler";

for (let i = 1; i <= app.project.numItems; i++) {
  const item = app.project.item(i);
  if (item instanceof CompItem) {
    item.remove();
  }
}

const comp = app.project.items.addComp("my comp", 1920, 1080, 1, 10, 60);
comp.openInViewer();

const textLayer = comp.layers.addText("hello, world");
const rect = getRect(textLayer, 0);

setTextLayerHelper(textLayer, {
  text: "kong is nice!!",
  justification: "center",
  fontSize: 50,
  stroke: {
    width: 2,
    color: "#0000ff",
    overFill: true,
  },
  tracking: 150,
  applyFill: false,
  scale: 200,
  rotation: 45,
  opacity: 50,
});

// textLayer.scale.setValue([400, 400]);
//
// const rect = textLayer.sourceRectAtTime(0, false);
// textLayer.anchorPoint.setValue([0, -rect.height / 2]);
// textLayer.transform.rotation.setValue(45);
//
// const textDocumentProperty = textLayer.property(
//   "Source Text",
// ) as TextDocumentProperty;
// const textDocument = textDocumentProperty.value;
// textDocument.fontSize = 30;
// textDocument.fillColor = [1, 0, 0];
// textDocument.text = "kong";
// textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
// textDocument.strokeColor = [0, 1, 0];
// textDocument.strokeWidth = 5;
// textDocument.strokeOverFill = true;
// textDocument.applyStroke = true;
//
// textDocumentProperty.setValue(textDocument);
