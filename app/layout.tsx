import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://jonathanchekkd.github.io/carrieros-eval-report/',
  ),
  title: 'Carrier OS — Armed vs Unarmed',
  description:
    'A controlled evaluation of how the resident Carrier framework changes a local model’s spreadsheet reasoning and fabrication rate.',
  openGraph: {
    title: 'Carrier OS — Armed vs Unarmed',
    description: 'Fabrications: 4 → 2 → 0',
    images: ['og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrier OS — Armed vs Unarmed',
    description: 'Fabrications: 4 → 2 → 0',
    images: ['og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
