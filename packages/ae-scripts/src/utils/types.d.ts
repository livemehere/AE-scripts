export type Position = [number, number]; // [x, y]
export type Size = [number, number]; // [width, height]
type ShapeType =
  | "Rectangle"
  | "Ellipse"
  | "Star"
  | "Rounded Rectangle"
  | "Polygon";

export type BaseLayerOptions = {
  name: string;
  position?: Position;
  startTime?: number;
  endTime?: number;
};

export type CompositionOptions = {
  name: string;
  duration: number;
  size: Size;
  fps?: number;
  pixelAspect?: number;
};

export type TextLayerOptions = {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  justification?: ParagraphJustification;
  stroke?: number;
  strokeColor?: string;
  leading?: number;
  strokeOverFill?: boolean;
} & BaseLayerOptions;

export type RectangleLayerOptions = {
  size: Size;
  color: string;
  stroke: number;
  strokeColor: string;
} & BaseLayerOptions;
