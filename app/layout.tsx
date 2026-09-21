import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { WorkoutWebMcpTools } from '@/components/workout/webmcp-tools';
import './globals.css';

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
  description:
    'As tuas aulas SamoraFit Workout com Bruno Samora. Escolhe o módulo e começa a treinar.',
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
        {children}
        <WorkoutWebMcpTools />
        <Script
          src="https://core.cademi.com.br/assets/js/vendor/iframeResizer.contentWindow.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
