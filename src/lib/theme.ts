/**
 * Light/dark theme. The choice is stored in localStorage under THEME_KEY;
 * with nothing stored, the OS setting (prefers-color-scheme) decides.
 * The active theme is the `dark` class on <html>.
 */
export const THEME_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * Runs inline in <head>, before first paint, so the page never flashes the
 * wrong theme. Kept tiny and dependency-free; wrapped in try because
 * localStorage throws when storage is blocked.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
