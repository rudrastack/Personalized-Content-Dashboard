import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/redux/StoreProvider';

export const metadata: Metadata = {
  title: 'PrismFlow | Personalized Content Dashboard',
  description:
    'An interactive and customizable personalized content feed aggregating news, curated recommendations, and social chatter.',
  keywords: [
    'Content Dashboard',
    'Personalized Feed',
    'News API',
    'React',
    'Next.js',
    'Redux Toolkit',
    'Tailwind CSS',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
