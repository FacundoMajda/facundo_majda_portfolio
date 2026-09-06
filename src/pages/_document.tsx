import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/og.svg" type="image/svg+xml" />
        <meta name="application-name" content="Facundo Majda" />
        <meta name="apple-mobile-web-app-title" content="Facundo Majda" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body className="bg-[#050505] text-slate-200 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
