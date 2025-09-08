import type {Metadata} from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "../components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Maara - The Truly Undetectable Browser',
  description: 'Invisible during screen shares, perfect for seamless Otter.ai transcription in meetings. Use Ctrl+Shift+\\ to instantly hide/unhide without detection.',
  icons: {
    icon: ['/favicon.svg', '/icon.svg'],
    shortcut: ['/favicon.svg'],
    apple: ['/icon.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
