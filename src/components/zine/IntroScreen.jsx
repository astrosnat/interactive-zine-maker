import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Decorative element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-24 h-24 border border-stone-700 rotate-45 mb-16 relative"
      >
        <div className="absolute inset-2 border border-stone-800 rotate-0" />
        <div className="absolute inset-4 bg-stone-800/50" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl text-stone-100 mb-6"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        The Unsettling
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-stone-500 text-lg md:text-xl max-w-md mb-4"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        An interactive zine of uncomfortable questions
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-stone-600 text-sm max-w-sm mb-16 italic"
      >
        Answer honestly. Art will emerge from your shadows.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <Button
          onClick={onStart}
          className="group bg-transparent border border-stone-500 text-stone-300 
                     hover:bg-stone-100 hover:text-stone-900 hover:border-stone-100
                     rounded-none px-12 py-7 text-sm tracking-[0.2em] uppercase
                     transition-all duration-500"
        >
          Begin
          <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-stone-700 text-xs tracking-widest"
      >
        5 QUESTIONS AWAIT
      </motion.p>
    </motion.div>
  );
}