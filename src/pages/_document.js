import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* App Icons */}
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* PWA Theme Color */}
        <meta name="theme-color" content="#4F46E5" />

        {/* Optional: Better display on iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
