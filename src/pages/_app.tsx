import "@/styles/globals.css";
// The Contact Form block ships its own global stylesheet next to the component.
// The Pages Router only allows global CSS from this file, so it is imported here.
import "@/components/blocx/contact-form.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      {isAdmin && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
