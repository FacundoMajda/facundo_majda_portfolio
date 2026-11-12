import "@/styles/globals.css";
// The Contact Form block ships its own global stylesheet next to the component.
// The Pages Router only allows global CSS from this file, so it is imported here.
import "@/components/blocx/contact-form.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
