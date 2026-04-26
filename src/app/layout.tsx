import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Japan 2026 — Family Trip Companion',
  description: 'Travel planner for Anand, Saranya & Aila — Melbourne to Japan, September 11-23, 2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗾</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
