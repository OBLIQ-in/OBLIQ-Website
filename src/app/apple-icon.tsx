import { ImageResponse } from "next/og";

// 180×180 home-screen icon, generated at build time from the same mark as
// icon.svg so the repo stays binary-free. Full-bleed and opaque: iOS applies
// its own rounded mask.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// ImageResponse can't read CSS variables — these mirror --ink and --cream.
const INK = "#1a1615";
const CREAM = "#f5f2eb";

// Same pixel "O" path as icon.svg (32-unit grid), without the rounded tile.
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="${CREAM}" fill-rule="evenodd" d="M12 6h8v4h4v12h-4v4h-8v-4H8V10h4z M12 10v12h8V10z"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={`data:image/svg+xml,${encodeURIComponent(mark)}`} width={150} height={150} alt="" />
      </div>
    ),
    size
  );
}
