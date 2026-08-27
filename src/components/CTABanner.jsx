'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-white overflow-hidden shadow-2xl border border-purple-400/40"
    >
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-800 to-fuchsia-900 -z-10" />
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-25 pointer-events-none -z-10" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/30 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-fuchsia-500/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Decorative Rocket background watermark */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-6 -bottom-6 text-white/10 pointer-events-none hidden lg:block"
      >
        <Rocket size={220} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 space-y-4 text-center lg:text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-md font-jakarta">
          <Sparkles size={14} className="text-purple-200" />
          <span>Launch Your Project</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-outfit">
          Ready to Engineer Your <br />
          <span className="text-fuchsia-200">Next Digital Advantage?</span>
        </h2>

        <p className="text-purple-100/90 text-base leading-relaxed font-medium font-outfit">
          Partner with SS Infotech to transform your software vision into a high-performance digital product.
        </p>
      </div>

      {/* Action CTA Button */}
      <div className="relative z-10 flex-shrink-0 font-jakarta">
        <Link 
          href="/contact"
          className="px-8 py-4 rounded-full bg-white hover:bg-purple-50 text-purple-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-2xl shadow-purple-950/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <span>Get Free Consultation</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-purple-700" />
        </Link>
      </div>
    </motion.section>
  );
}


