// Same card for X/Twitter — the post's metadata overrides the layout's twitter
// block, so without this file posts would share with no twitter:image.
export { default, alt, size, contentType, generateStaticParams } from "./opengraph-image";
