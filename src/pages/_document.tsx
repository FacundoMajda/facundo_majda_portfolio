import { Html, Head, Main, NextScript } from "next/document";

const STRIP_ATTRS = `["bis_skin_checked","data-darkreader-inline-stroke","data-darkreader-inline-fill","data-darkreader-inline-bgcolor","data-darkreader-inline-bgimage","data-darkreader-inline-border","data-darkreader-inline-color","data-darkreader-inline-outline","data-darkreader-inline-stopcolor","data-darkreader-inline-boxshadow","data-darkreader-inline-invert","data-darkreader-proxy-injected","data-gr-ext-installed","data-new-gr-c-s-check-loaded","data-lt-installed","data-lt-tmp-id","data-google-query-id","cz-shortcut-listen","data-extension-installed"]`;

const STRIP_SCRIPT = `(function(){var A=${STRIP_ATTRS};function s(e){if(!e||!e.removeAttribute)return;for(var i=0;i<A.length;i++)e.removeAttribute(A[i]);}s(document.documentElement);var q=document.querySelectorAll("*");for(var j=0;j<q.length;j++)s(q[j]);try{var o=new MutationObserver(function(muts){for(var k=0;k<muts.length;k++){var m=muts[k];s(m.target);m.addedNodes.forEach(function(n){if(n.nodeType===1)s(n);});}});o.observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:A});setTimeout(function(){o.disconnect();},5000);}catch(e){}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: STRIP_SCRIPT }} />
      </Head>
      <body className="antialiased" suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
