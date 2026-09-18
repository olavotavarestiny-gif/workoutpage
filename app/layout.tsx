import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { WebMcpTools } from '@/components/workout/webmcp-tools';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SAMORA WORKOUT',
  description: 'O teu próximo nível começa hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebMcpTools />
        {children}
      </body>
    </html>
  );
}
