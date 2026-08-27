'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTABanner from '@/components/CTABanner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, X, ChevronLeft, ChevronRight, Filter, 
  Building2, Users, Award, Calendar, Sparkles, Image as ImageIcon 
} from 'lucide-react';
import Link from 'next/link';

import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

const categories = [
  'All',
  'Cultural & Celebrations',
  'Company Events',
  'Training & Workshops',
  'Office Environment',
  'Team Activities'
];

const galleryItems = REAL_COMPANY_GALLERY_ITEMS;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      <Navbar />

      {/* Gallery Header Banner */}
      <section className="relative pt-36 pb-16 px-6 md:px-12 lg:px-16 xl:px-20 w-full max-w-[1536px] mx-auto overflow-hidden text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4"
        >
          <Camera size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Life at SS Infotech</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Corporate <span className="gradient-accent">Gallery &amp; Culture</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          Explore our real office environment, live tech seminars, engineering workshops, corporate leadership, and company milestones.
        </motion.p>
      </section>

      {/* Category Filter Tabs */}
      <section className="px-6 md:px-12 lg:px-16 xl:px-20 w-full max-w-[1536px] mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-2.5 font-jakarta">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/35 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/80 dark:border-slate-800 shadow-sm'
              }`}
            >
              {cat === 'Real Company Photos' && <Sparkles size={13} className="text-amber-300 animate-pulse" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Responsive Image Grid */}
      <section className="px-6 md:px-12 lg:px-16 xl:px-20 w-full max-w-[1536px] mx-auto pb-20">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden glass-card border border-purple-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg cursor-pointer hover:border-purple-400 transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-purple-50 dark:bg-slate-800`}>
                  {item.isReal && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg flex items-center gap-1.5 font-jakarta uppercase tracking-wider border border-white/20">
                      <Sparkles size={12} className="text-amber-300" />
                      <span>Verified SS Infotech Photo</span>
                    </div>
                  )}

                  <img 
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const imgElement = e.currentTarget;
                      const realMatch = REAL_COMPANY_GALLERY_ITEMS.find(r => r.id === item.id);
                      if (realMatch?.fallbackSrc && imgElement.src !== realMatch.fallbackSrc) {
                        imgElement.src = realMatch.fallbackSrc;
                      } else if (!imgElement.src.includes('/img/gallery/')) {
                        const filename = item.imgSrc.split('/').pop();
                        imgElement.src = `/img/gallery/${filename}`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                </div>

                <div className="p-5 font-outfit">
                  <div className="flex items-center justify-between gap-2 mb-2 font-jakarta">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300/40 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close modal"
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden glass-card bg-slate-900 border border-slate-700 shadow-2xl flex flex-col"
            >
              <div className="relative w-full max-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
                {activeItem.isReal && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl flex items-center gap-1.5 font-jakarta uppercase tracking-wider border border-white/20">
                    <Sparkles size={14} className="text-amber-300" />
                    <span>Verified SS Infotech Photo</span>
                  </div>
                )}
                <img
                  src={activeItem.imgSrc}
                  alt={activeItem.title}
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    const realMatch = REAL_COMPANY_GALLERY_ITEMS.find(r => r.id === activeItem.id);
                    if (realMatch?.fallbackSrc && imgElement.src !== realMatch.fallbackSrc) {
                      imgElement.src = realMatch.fallbackSrc;
                    } else if (!imgElement.src.includes('/img/gallery/')) {
                      const filename = activeItem.imgSrc.split('/').pop();
                      imgElement.src = `/img/gallery/${filename}`;
                    }
                  }}
                />
              </div>

              <div className="p-6 md:p-8 bg-slate-900 text-white space-y-3 font-outfit">
                <div className="flex items-center justify-between gap-4 font-jakarta flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-600 text-white uppercase">
                      {activeItem.category}
                    </span>
                    {activeItem.isReal && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Official Company Media
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-bold">{activeItem.location}</span>
                  </div>
                  <span className="text-xs font-mono text-purple-400 font-bold">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <h3 className="text-2xl font-black">{activeItem.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {activeItem.caption}
                </p>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>

      <Footer />
    </main>
  );
}
