// Vite's `?raw` suffix imports a file's contents as a string (Storybook only).
declare module "*?raw" {
  const content: string;
  export default content;
}
