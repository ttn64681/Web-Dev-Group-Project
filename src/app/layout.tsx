import { Inter, Dongle, Nunito } from 'next/font/google';
import './globals.css';
import ClientLayout from '../components/ClientLayout';
import { Metadata } from 'next';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dongle = Dongle({
  subsets: ['latin'],
  variable: '--font-dongle',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'CourseHub',
  description: 'Your one-stop platform for course information and reviews',
  icons: {
    icon: '/logo/logo-star-189wh.png',
    shortcut: '/logo/logo-star-189wh.png',
    apple: '/logo/logo-star-189wh.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/logo/logo-star-189wh.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable} ${dongle.variable}`}>
      <body
        className={`${inter.variable} font-inter bg-purple-dark-transition min-h-[calc(100vh-8rem)]`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
