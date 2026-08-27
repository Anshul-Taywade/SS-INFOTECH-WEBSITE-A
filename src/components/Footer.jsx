'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send, CheckCircle2, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { api } from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.subscribeNewsletter(email);
    } catch (err) {
      console.warn('Newsletter API warning:', err.message);
    } finally {
      setSubscribed(true);
      setEmail('');
      setLoading(false);
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative border-t border-purple-200/60 dark:border-slate-800/80 bg-purple-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 dark:bg-purple-600/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info & Status */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <Link href="/" className="flex items-center group shrink-0 cursor-pointer">
                <img 
                  src="/images/logos/logo.png" 
                  alt="SS INFOTECH - Enterprise Software & IT Solutions" 
                  className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
                  onError={(e) => { e.currentTarget.src = '/images/logos/logo.jpg'; }}
                />
              </Link>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium font-outfit">
              Engineering digital success with innovative technology research, scalable cloud infrastructure, and custom AI applications.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-700 px-3 py-1.5 rounded-full text-emerald-800 dark:text-emerald-300 text-[11px] font-extrabold font-jakarta">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="w-9 h-9 rounded-xl glass-card border border-purple-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-jakarta">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
              <span>Enterprise Navigation</span>
            </h5>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-bold font-outfit">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services & Capabilities', href: '/services' },
                { name: 'Industries & Solutions', href: '/solutions' },
                { name: 'Corporate Gallery & Culture', href: '/gallery' },
                { name: 'Careers & Culture', href: '/careers' },
                { name: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 group cursor-pointer">
                    <span>{item.name}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-jakarta">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600 dark:bg-fuchsia-400" />
              <span>Contact Info</span>
            </h5>
            <ul className="space-y-4 text-xs text-slate-600 dark:text-slate-300 font-bold font-outfit">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0">
                  <MapPin size={15} />
                </div>
                <span className="leading-relaxed">#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 shrink-0">
                  <Phone size={15} />
                </div>
                <a href="tel:+917770023791" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">+91 77700 23791</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 shrink-0">
                  <Mail size={15} />
                </div>
                <a href="mailto:info@ssinfotech.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">info@ssinfotech.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-jakarta">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
              <span>Newsletter</span>
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-medium font-outfit">
              Subscribe to receive software engineering research, tech updates, and product insights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-2xl p-1 focus-within:border-purple-600 transition-colors shadow-sm font-outfit">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="bg-transparent border-none outline-none text-slate-900 dark:text-white px-3 text-xs flex-grow placeholder-slate-400 dark:placeholder-slate-500 font-medium" 
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 font-jakarta uppercase cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Joining...' : 'Join'}</span>
                  <Send size={11} />
                </button>
              </div>

              {subscribed && (
                <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1 font-outfit">
                  <CheckCircle2 size={13} />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-purple-200/60 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400 gap-4 font-bold font-jakarta">
          <p>&copy; {new Date().getFullYear()} SS Infotech. All rights reserved.</p>
          <div className="flex gap-6 text-slate-600 dark:text-slate-300">
            <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">About Us</Link>
            <Link href="/services" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">Services</Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">Contact</Link>
            <Link href="/admin" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer text-purple-600 dark:text-purple-400 font-extrabold flex items-center gap-1">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}