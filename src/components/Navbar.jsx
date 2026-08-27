'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ArrowUpRight, ChevronRight, Mail, ShieldCheck, Globe } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">

      {/* Main Navbar */}
      <div className={`px-4 sm:px-6 md:px-12 py-2.5 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 shadow-sm'
      }`}>
        <div className="w-full max-w-[1536px] mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0 py-0.5 cursor-pointer">
            <img 
              src="/images/logos/logo.png"
              alt="SS INFOTECH - Enterprise Software Solutions" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
              onError={(e) => { e.currentTarget.src = '/images/logos/logo.jpg'; }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <nav className="flex items-center gap-1">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.name}
                    href={l.href}
                    className={`px-3.5 py-2 text-xs xl:text-sm font-semibold transition-all duration-200 relative rounded-xl cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100/90 dark:bg-purple-950/60 font-extrabold shadow-sm' 
                        : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    {l.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

            <ThemeToggle />

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:opacity-95 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-purple-600/30 hover:scale-105 transition-all cursor-pointer font-jakarta"
            >
              Get Consultation
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2.5 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-1.5 p-5 mx-auto mt-2 border border-slate-200 shadow-2xl lg:hidden max-w-7xl rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl dark:border-slate-800"
          >
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-bold transition-all rounded-xl cursor-pointer ${
                    isActive 
                      ? 'bg-purple-100/90 dark:bg-slate-800 text-purple-700 dark:text-purple-300 font-extrabold' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-purple-600'
                  }`}
                >
                  <span>{l.name}</span>
                  <ChevronRight size={16} className={isActive ? "text-purple-600" : "opacity-40"} />
                </Link>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 font-jakarta">
              <a 
                href="tel:+917770023791" 
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <Phone size={15} className="text-purple-600 dark:text-purple-400" />
                <span>+91 77700 23791</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl text-white bg-gradient-to-r from-purple-800 to-fuchsia-600 shadow-md cursor-pointer"
              >
                <span>Get Consultation</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}