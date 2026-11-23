import "@/styles/globals.css";
// The Contact Form block ships its own global stylesheet next to the component.
// The Pages Router only allows global CSS from this file, so it is imported here.
import "@/components/blocx/contact-form.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
