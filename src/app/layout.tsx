// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

// Налаштування шрифту Inter з Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Метадані для SEO
export const metadata: Metadata = {
  title: 'AI Dashboard | TalentCore HR Solutions',
  description: 'Analytics dashboard with AI assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable}`}
      // Додаємо підтримку темного режиму для Tailwind
      suppressHydrationWarning
    >
      <body className={`
        font-sans 
        bg-gray-50 text-gray-900 
        dark:bg-gray-900 dark:text-white
        transition-colors duration-200
      `}>
        {children}
      </body>
    </html>
  );
}