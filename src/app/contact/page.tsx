import { permanentRedirect } from "next/navigation";

/** The contact page moved to /contact-us (matching the Framer site); old links still work. */
export default function ContactPage() {
  permanentRedirect("/contact-us");
}
