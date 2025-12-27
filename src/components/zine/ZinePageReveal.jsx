import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ZinePageReveal({ page, onContinue, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-stone-900/50" />
          {page.image_url ? (
            <img 
              src={page.image_url} 
              alt="Generated artwork"
              className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
            />
          ) : (
            <div className="w-full h-full bg-stone-900 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-stone-700 animate-pulse" />
            </div>
          )}
          
          {/* Grain overlay */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Page number */}
          <div className="absolute bottom-4 right-4 text-stone-500 text-xs tracking-widest">
            PAGE {page.page_number}
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-8"
        >
          {/* Your answer */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-600 mb-3">
              You said
            </p>
            <p className="text-stone-400 italic text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              "{page.answer}"
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-stone-700" />

          {/* The musing */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-600 mb-4">
              A reflection
            </p>
            <p 
              className="text-stone-200 text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {page.musing}
            </p>
          </div>

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-8"
          >
            <Button
              onClick={onContinue}
              className="group bg-transparent border border-stone-600 text-stone-300 
                         hover:bg-stone-100 hover:text-stone-900 hover:border-stone-100
                         rounded-none px-8 py-6 text-sm tracking-wider uppercase
                         transition-all duration-500"
            >
              {isLast ? 'View Your Zine' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}