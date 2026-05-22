import "@testing-library/jest-dom";

// Provide a minimal Canvas 2D context mock so VexFlow's text metrics
// (txtCanvas) and drawing paths don't emit warnings in jsdom.
const mockContext = {
  // text
  measureText: () => ({
    width: 0,
    actualBoundingBoxAscent: 0,
    actualBoundingBoxDescent: 0,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: 0,
    fontBoundingBoxAscent: 0,
    fontBoundingBoxDescent: 0,
  }),
  fillText: () => {},
  strokeText: () => {},
  // paths
  beginPath: () => {},
  closePath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  bezierCurveTo: () => {},
  quadraticCurveTo: () => {},
  arc: () => {},
  arcTo: () => {},
  ellipse: () => {},
  rect: () => {},
  fill: () => {},
  stroke: () => {},
  clip: () => {},
  isPointInPath: () => false,
  isPointInStroke: () => false,
  // rectangles
  clearRect: () => {},
  fillRect: () => {},
  strokeRect: () => {},
  // transforms
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  scale: () => {},
  transform: () => {},
  setTransform: () => {},
  resetTransform: () => {},
  getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
  // images
  drawImage: () => {},
  getImageData: () => ({ data: new Uint8ClampedArray(), width: 0, height: 0, colorSpace: "srgb" }),
  putImageData: () => {},
  createImageData: () => ({
    data: new Uint8ClampedArray(),
    width: 0,
    height: 0,
    colorSpace: "srgb",
  }),
  // gradients / patterns
  createLinearGradient: () => ({ addColorStop: () => {} }),
  createRadialGradient: () => ({ addColorStop: () => {} }),
  createConicGradient: () => ({ addColorStop: () => {} }),
  createPattern: () => null,
  // line dash
  setLineDash: () => {},
  getLineDash: () => [] as number[],
  // misc
  canvas: { width: 300, height: 150 } as HTMLCanvasElement,
  font: "10px sans-serif",
  fillStyle: "#000",
  strokeStyle: "#000",
  lineWidth: 1,
  lineCap: "butt" as CanvasLineCap,
  lineJoin: "miter" as CanvasLineJoin,
  miterLimit: 10,
  lineDashOffset: 0,
  globalAlpha: 1,
  globalCompositeOperation: "source-over" as GlobalCompositeOperation,
  textAlign: "start" as CanvasTextAlign,
  textBaseline: "alphabetic" as CanvasTextBaseline,
  direction: "ltr" as CanvasDirection,
  shadowColor: "rgba(0,0,0,0)",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  imageSmoothingEnabled: true,
  imageSmoothingQuality: "low" as ImageSmoothingQuality,
} as unknown as CanvasRenderingContext2D;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(HTMLCanvasElement.prototype as any).getContext = (contextId: string) =>
  contextId === "2d" ? mockContext : null;
