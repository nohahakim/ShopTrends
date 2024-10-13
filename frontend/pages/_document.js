import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  //
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet(); // The ServerStyleSheet class is used to collect styles from components in the page and return them in the head of the document.
    const originalRenderPage = ctx.renderPage; // The renderPage method is used to retrieve styles from the components in the page.
    //

    try {
      // Step 1: Retrieve styles from components in the page
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // Step 2: Run the parent class getInitialProps method
      const initialProps = await Document.getInitialProps(ctx);

      // Step 3: Return the styles in the head
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // Step 4: Close the document
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/static/radnikanext-medium-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// The getInitialProps method is a static method that is called by Next.js to retrieve data before rendering the page. In this case, the method is used to retrieve styles from the components in the page and return them in the head of the document.
