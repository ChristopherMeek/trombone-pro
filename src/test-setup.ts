import "@testing-library/jest-dom";

// Silence jsdom's "Not implemented: HTMLCanvasElement.getContext()" warnings
// triggered by VexFlow's canvas detection at import time.
HTMLCanvasElement.prototype.getContext = () => null;
