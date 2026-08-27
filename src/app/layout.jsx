import './globals.css';
import LenisWrapper from '@/components/LenisWrapper';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = { 
  title: 'SS Infotech | Enterprise Software & IT Solutions', 
  description: 'Premier IT Research and Products Development Firm. Delivering enterprise software, AI solutions, mobile apps, and cloud architecture.',
  icons: {
    icon: '/images/logos/ss_infotech_icon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" data-theme="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme') || localStorage.getItem('ss-theme');
                  var theme = (saved === 'dark') ? 'dark' : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-outfit antialiased selection:bg-purple-600 selection:text-white">
        <ThemeProvider>
          <LenisWrapper>{children}</LenisWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}