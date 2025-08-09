declare global {
  interface Window {
    api?: any; // Replace any with a stricter interface incrementally as preload typings evolve
  }
}
export {};
