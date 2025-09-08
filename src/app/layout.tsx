import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Maara - The Truly Undetectable Browser',
  description: 'Invisible during screen shares, perfect for seamless Otter.ai transcription in meetings. Use Ctrl+Shift+\\ to instantly hide/unhide without detection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-body antialiased">
        {/* Global Header */}
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
