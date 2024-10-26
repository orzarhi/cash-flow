import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata, Viewport } from 'next';
import { Recursive } from 'next/font/google';
import './globals.css';

const inter = Recursive({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cash Flow',
//   description:
//     'נהל את הוצאות בניית הבית שלך בצורה פשוטה ויעילה. דע לאן כל שקל נעלם ותקבל תמונה ברורה על התקציב שלך.',
// };

const APP_NAME = 'PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} antialiased`}>
        <main className="container mx-auto p-2.5 flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <Providers>
              <Toaster position="top-center" dir="rtl" duration={5000} />
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
