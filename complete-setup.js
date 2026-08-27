const fs = require('fs');
const path = require('path');

// All files required for a 100% working build, with all dependencies pre-defined
const files = {
  'package.json': JSON.stringify({
    "name": "ss-infotech",
    "version": "0.1.0",
    "private": true,
    "scripts": { "dev": "next dev", "build": "next build", "start": "next start", "lint": "next lint" },
    "dependencies": {
      "@studio-freight/lenis": "^1.0.42",
      "clsx": "^2.1.1",
      "framer-motion": "^11.3.2",
      "lucide-react": "^0.400.0",
      "next": "14.2.5",
      "react": "^18",
      "react-dom": "^18",
      "tailwind-merge": "^2.4.0"
    },
    "devDependencies": {
      "autoprefixer": "^10.4.19",
      "eslint": "^8",
      "eslint-config-next": "14.2.5",
      "postcss": "^8.4.40",
      "tailwindcss": "^3.4.1"
    }
  }, null, 2),
  
  'jsconfig.json': JSON.stringify({
    "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } }
  }, null, 2),

  'postcss.config.js': `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
  
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { 'primary-dark': '#2E1065', 'secondary-accent': '#7C3AED', 'secondary-accent-hover': '#9333EA', 'text-primary': '#1E1B4B', 'text-muted': '#6B7280' },
      backgroundImage: { 'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))' },
    },
  },
  plugins: [],
}`,
  'src/app/globals.css': `@tailwind base; @tailwind components; @tailwind utilities;
@layer base { body { @apply bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#EBE0FF] text-text-primary antialiased selection:bg-secondary-accent selection:text-white; } }
@layer components { .glass-card { @apply bg-purple-100/50 backdrop-blur-md border border-purple-200/70 shadow-lg hover:shadow-purple-500/15 transition-all duration-300; } }`,
  
  'src/app/layout.jsx': `import './globals.css';
import LenisWrapper from '@/components/LenisWrapper';
export const metadata = { title: 'SS Infotech', description: 'Transforming Ideas Into Digital Reality' };
export default function RootLayout({ children }) { return (<html lang="en"><body><LenisWrapper>{children}</LenisWrapper></body></html>); }`,
  
  'src/app/page.jsx': `'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
export default function Home() { return (<main className="min-h-screen w-full overflow-x-hidden flex flex-col"><Navbar /><Hero /><TrustedBy /><Services /><WhyChooseUs /><Footer /></main>); }`,

  'src/components/LenisWrapper.jsx': `'use client'; import { useEffect } from 'react'; import Lenis from '@studio-freight/lenis';
export default function LenisWrapper({ children }) { useEffect(() => { const lenis = new Lenis(); function raf(time) { lenis.raf(time); requestAnimationFrame(raf); } requestAnimationFrame(raf); return () => lenis.destroy(); }, []); return children; }`,

  'src/components/hooks/useMousePosition.js': `import { useState, useEffect } from 'react';
export const useMousePosition = () => { const [pos, setPos] = useState({ x: 0, y: 0 }); useEffect(() => { const update = (e) => setPos({ x: e.clientX, y: e.clientY }); window.addEventListener('mousemove', update); return () => window.removeEventListener('mousemove', update); }, []); return pos; };`,

  'src/components/ui/SpotlightCard.jsx': `'use client'; import { useRef, useState } from 'react'; import { motion } from 'framer-motion'; import { ArrowRight } from 'lucide-react';
export default function SpotlightCard({ icon: Icon, title, description }) { const ref = useRef(null); const [pos, setPos] = useState({ x: 0, y: 0 }); const handleMove = (e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); };
return (<motion.div ref={ref} onMouseMove={handleMove} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -8, scale: 1.015 }} transition={{ type: "spring", stiffness: 300 }} className="relative glass-card rounded-2xl p-8 group cursor-default overflow-hidden min-h-[280px]" style={{ background: \`radial-gradient(500px circle at \${pos.x}px \${pos.y}px, rgba(147, 51, 234, 0.12), transparent 40%)\` }}>
<div className="absolute inset-0 bg-glass-light pointer-events-none rounded-2xl" />
<motion.div whileHover={{ scale: 1.12, rotate: 6 }} className="relative z-10 mb-5 p-3 bg-primary-dark/5 rounded-xl w-fit text-primary-dark"><Icon size={32} strokeWidth={1.5} /></motion.div>
<h3 className="relative z-10 text-xl font-bold text-primary-dark mb-3">{title}</h3>
<p className="relative z-10 text-sm text-text-muted leading-relaxed flex-grow">{description}</p>
<motion.a href="#" className="relative z-10 mt-5 flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-secondary-accent transition-colors">Learn More <motion.span initial={{ x: 0 }} whileHover={{ x: 6 }}><ArrowRight size={16} /></motion.span></motion.a>
</motion.div>); }`,

  'src/components/Navbar.jsx': `'use client'; import { Phone, Menu } from 'lucide-react';
const links = ['Home', 'About Us', 'Services', 'Careers', 'Gallery'];
export default function Navbar() { return (<header className="w-full py-4 px-6 md:px-12 flex flex-col gap-4 relative z-50">
<div className="flex justify-end items-center gap-6 text-sm text-text-muted font-medium">
<div className="flex items-center gap-2"><Phone size={16} className="text-secondary-accent" /><span>+91 77700 23791</span></div>
<button className="bg-primary-dark text-white px-5 py-1.5 rounded-full hover:bg-secondary-accent transition-colors text-xs font-semibold">Get To Touch</button>
</div>
<div className="flex items-center justify-between w-full border-b border-purple-200 pb-4">
<div className="flex flex-col"><h1 className="text-2xl font-extrabold tracking-tight text-primary-dark leading-none">SS INFOTECH</h1><span className="text-[10px] tracking-[0.2em] font-medium text-text-muted uppercase mt-1">Innovate. Solve. Succeed.</span></div>
<nav className="hidden md:flex items-center gap-8 font-medium text-sm text-text-muted">{links.map((l) => (<a key={l} href="#" className="relative group hover:text-primary-dark transition-colors py-1">{l}<span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary-accent transition-all duration-300 group-hover:w-full" /></a>))}</nav>
<button className="md:hidden"><Menu className="text-primary-dark" /></button>
</div></header>); }`,

  'src/components/Hero.jsx': `'use client'; import { motion } from 'framer-motion'; import { ArrowRight, Play, CheckCircle } from 'lucide-react';
export default function Hero() { return (<section className="relative px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden">
<div className="flex-1 z-10 space-y-6"><motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-purple-100/60 backdrop-blur-sm border border-purple-200 px-4 py-1.5 rounded-full text-xs font-semibold text-secondary-accent"><span className="w-2 h-2 rounded-full bg-secondary-accent animate-pulse" />Innovate. Build. Elevate.</motion.div>
<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold leading-tight text-primary-dark">Transforming Ideas Into <br /><span className="bg-gradient-to-r from-secondary-accent to-purple-400 bg-clip-text text-transparent relative inline-block">Digital Reality<motion.div className="absolute inset-0 bg-secondary-accent/30 blur-xl -z-10" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} /></span></motion.h1>
<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg leading-relaxed max-w-lg">We deliver cutting-edge IT solutions that help businesses grow, adapt, and lead in the digital era.</motion.p>
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4"><button className="bg-primary-dark hover:bg-secondary-accent-hover text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-secondary-accent/30">Explore Services <ArrowRight size={18} /></button><button className="bg-white/70 backdrop-blur-sm border border-white/80 text-primary-dark hover:bg-white px-8 py-3 rounded-full flex items-center gap-2 transition-all shadow-sm"><Play size={16} fill="currentColor" /> View Our Work</button></motion.div>
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-6 pt-4 border-t border-purple-200/50">{[{ label: 'Years Experience', val: '10+' }, { label: 'Projects Delivered', val: '250+' }, { label: 'Happy Clients', val: '50+' }, { label: 'Client Satisfaction', val: '98%' }].map((s, i) => (<div key={i} className="flex items-center gap-2"><div className="p-1.5 rounded-full bg-purple-100/80 text-primary-dark"><CheckCircle size={14} /></div><div className="flex items-center gap-1 text-sm font-semibold"><span className="text-primary-dark">{s.val}</span><span className="text-text-muted font-normal text-xs">{s.label}</span></div></div>))}</motion.div></div>
<div className="flex-1 relative w-full h-[400px] flex justify-center items-center perspective-[1000px]"><div className="relative w-[80%] h-[70%] bg-[#1C1C2E] rounded-2xl border-[8px] border-gray-800 shadow-2xl shadow-purple-500/20 overflow-hidden flex flex-col transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0"><div className="h-6 bg-gray-800 flex items-center px-4 gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /><div className="w-2 h-2 rounded-full bg-green-500" /></div><div className="flex-1 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 flex flex-col justify-center items-center text-white/50 relative"><h3 className="text-lg font-bold text-white/80 mb-2">Building Scalable Solutions</h3><div className="w-full h-2/3 bg-white/5 rounded-lg border border-white/10" /><div className="absolute bottom-4 left-4 right-4 bg-white/10 h-8 rounded-lg" /></div></div>
{[{ label: 'React', x: '-20%', y: '-10%', delay: 0 }, { label: 'Node.js', x: '80%', y: '-20%', delay: 0.2 }, { label: 'Python', x: '-10%', y: '90%', delay: 0.4 }, { label: 'AWS', x: '90%', y: '70%', delay: 0.1 }, { label: 'JS', x: '70%', y: '10%', delay: 0.3 }, { label: 'PHP', x: '10%', y: '-15%', delay: 0.5 }].map((b, i) => (<motion.div key={i} className="absolute bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg px-4 py-2 rounded-full text-xs font-bold text-primary-dark flex items-center gap-2 z-20" style={{ left: b.x, top: b.y }} animate={{ y: [0, -12, 0] }} transition={{ duration: 4, delay: b.delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}>{b.label}</motion.div>))}</div></section>); }`,

  'src/components/TrustedBy.jsx': `'use client'; import { motion } from 'framer-motion';
const logos = ['Infosys', 'Tech Mahindra', 'Expleo', 'Genpact', 'HCL', 'HP'];
export default function TrustedBy() { return (<section className="w-full py-12 overflow-hidden"><h3 className="text-center font-semibold text-text-muted mb-6 tracking-wider">Trusted By Leading Companies</h3><div className="relative flex overflow-hidden w-full"><motion.div className="flex items-center gap-16 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>{[...logos, ...logos].map((logo, i) => (<div key={i} className="text-2xl font-bold text-gray-400 grayscale hover:grayscale-0 hover:text-primary-dark transition-all duration-300 cursor-default">{logo}</div>))}</motion.div></div></section>); }`,

  'src/components/Services.jsx': `'use client'; import { Code, Smartphone, Layout, Brain, Megaphone, Wifi } from 'lucide-react'; import SpotlightCard from './ui/SpotlightCard';
const services = [{ title: 'Website Development', description: 'We build fast, responsive and SEO-friendly websites that drive results.', icon: Code }, { title: 'Mobile App Development', description: 'We create powerful mobile applications for Android and iOS platforms.', icon: Smartphone }, { title: 'App Development', description: 'Custom app applications that cater to your business objectives.', icon: Layout }, { title: 'Machine Learning & AI', description: 'Smart AI solutions to automate processes and improve efficiency.', icon: Brain }, { title: 'Digital Marketing', description: 'Boost your online presence with data-driven digital marketing strategies.', icon: Megaphone }, { title: 'Integration Services', description: 'Seamless integration of third-party APIs and enterprise solutions.', icon: Wifi }];
export default function Services() { return (<section className="px-6 md:px-12 py-16"><div className="text-center mb-12"><h2 className="text-3xl font-bold text-primary-dark mb-2">Our Services</h2><p className="text-text-muted">We provide a wide range of IT services to help your business succeed</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map((s, i) => (<SpotlightCard key={i} icon={s.icon} title={s.title} description={s.description} />))}</div></section>); }`,

  'src/components/WhyChooseUs.jsx': `'use client'; import { motion } from 'framer-motion'; import { Users, Clock, ShieldCheck, Headphones } from 'lucide-react';
const features = [{ title: 'Experienced Team', desc: 'Skilled professionals with years of industry experience', icon: Users }, { title: 'On Time Delivery', desc: 'We value your time and always deliver projects on schedule', icon: Clock }, { title: 'Quality Assurance', desc: 'We ensure top-tier quality in every solution', icon: ShieldCheck }, { title: '24/7 Support', desc: 'Our support team is always available to help you', icon: Headphones }];
export default function WhyChooseUs() { return (<section className="px-6 md:px-12 py-16 bg-glass-light/50"><div className="text-center mb-12"><h2 className="text-3xl font-bold text-primary-dark">Why Choose Us</h2><p className="text-text-muted mt-2">We combine expertise with dedication to deliver the best results</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{features.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="glass-card rounded-xl p-6 text-center flex flex-col items-center"><motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-3 bg-primary-dark/5 rounded-full mb-4 text-primary-dark"><f.icon size={28} /></motion.div><h4 className="font-bold text-primary-dark mb-1">{f.title}</h4><p className="text-xs text-text-muted">{f.desc}</p></motion.div>))}</div></section>); }`,

  'src/components/Footer.jsx': `'use client'; import { Mail, MapPin, Phone, Send } from 'lucide-react';
export default function Footer() { return (<footer className="bg-primary-dark text-white pt-16 pb-8 px-6 md:px-12"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"><div className="space-y-4"><div className="flex flex-col"><h2 className="text-2xl font-extrabold">SS INFOTECH</h2><span className="text-[10px] tracking-widest text-purple-300 uppercase mt-1">Innovate. Solve. Succeed.</span></div><p className="text-sm text-purple-200/70 max-w-xs">Engineering digital success with innovative technology solutions.</p><div className="flex gap-4">{[0,1,2].map((s) => (<div key={s} className="w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center hover:bg-secondary-accent transition-colors cursor-pointer"><div className="w-3 h-3 bg-purple-300 rounded-full" /></div>))}</div></div><div><h5 className="font-bold text-lg mb-4">Quick Links</h5><ul className="space-y-2 text-sm text-purple-200/70"><li className="hover:text-white cursor-pointer">Home</li><li className="hover:text-white cursor-pointer">About Us</li><li className="hover:text-white cursor-pointer">Services</li><li className="hover:text-white cursor-pointer">Careers</li><li className="hover:text-white cursor-pointer">Gallery</li><li className="hover:text-white cursor-pointer">Contact</li></ul></div><div><h5 className="font-bold text-lg mb-4">Contact Us</h5><ul className="space-y-3 text-sm text-purple-200/70"><li className="flex items-start gap-3"><MapPin size={18} className="min-w-[18px] mt-0.5" /><span>#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.</span></li><li className="flex items-center gap-3"><Phone size={18} /> +91 77700 23791</li><li className="flex items-center gap-3"><Mail size={18} /> info@ssinfotech.com</li></ul></div><div><h5 className="font-bold text-lg mb-4">Newsletter</h5><p className="text-sm text-purple-200/70 mb-3">Subscribe to get updates on our services</p><div className="flex bg-white/10 rounded-full p-1.5 focus-within:ring-2 ring-secondary-accent"><input type="email" placeholder="Enter your email" className="bg-transparent border-none outline-none text-white px-4 text-sm flex-grow placeholder-purple-300/50" /><button className="bg-white text-primary-dark px-5 py-1.5 rounded-full text-xs font-bold hover:bg-purple-200 transition-colors flex items-center gap-2">Subscribe <Send size={12} /></button></div></div></div><div className="border-t border-purple-800/50 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-purple-300/50"><p>&copy; 2026 SS Infotech. All rights reserved.</p><div className="flex gap-4 mt-4 md:mt-0"><span>Privacy Policy</span><span>Terms of Service</span></div></div></footer>); }`
};

// Function to write files recursively
function writeFiles(obj, basePath = '') {
  Object.entries(obj).forEach(([key, value]) => {
    const fullPath = path.join(basePath, key);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, value, 'utf8');
    console.log(`✅ Created: ${fullPath}`);
  });
}

console.log("🚀 Building your 100% Complete SS Infotech project...");
writeFiles(files);
console.log("\n🎉 Success! All files generated. Now run the commands below:");