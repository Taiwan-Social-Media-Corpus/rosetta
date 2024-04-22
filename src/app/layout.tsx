import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import theme from '@config/theme';
import type { Metadata, Viewport } from 'next';
import FontsStyle from '@components/Fonts';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Shell from '@components/Shell';

export const metadata: Metadata = {
  title: 'Taiwan Social Media Corpus',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <head>
        <ColorSchemeScript />
      </head>
      <FontsStyle />
      <body>
        <MantineProvider theme={theme}>
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
