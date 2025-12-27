import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function ZineGallery({ pages, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedPages = [...pages].sort((a, b) => a.page_number - b.page_number);

  const goNext = () => {
    if (currentIndex < sortedPages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentPage = sortedPages[currentIndex];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-10 flex justify-between items-center"
      >
        <div>
          <h1 
            className="text-2xl md:text-3xl text-stone-200"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Zine
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {sortedPages.length} pages of introspection
          </p>
        </div>
        
        <Button
          onClick={onRestart}
          variant="ghost"
          className="text-stone-500 hover:text-stone-200 hover:bg-stone-800"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </motion.div>

      {/* Gallery content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 md:gap-12"
            >
              {/* Image */}
              <div className="relative aspect-square bg-stone-900">
                {currentPage.image_url ? (
                  <img 
                    src={currentPage.image_url} 
                    alt={`Page ${currentPage.page_number}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-700">
                    No image
                  </div>
                )}
                
                {/* Grain overlay */}
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="text-xs tracking-[0.3em] uppercase text-stone-600">
                  Page {currentPage.page_number} of {sortedPages.length}
                </div>
                
                <p 
                  className="text-stone-500 text-sm italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {currentPage.question}
                </p>
                
                <div className="w-12 h-px bg-stone-700" />
                
                <p 
                  className="text-stone-400 italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "{currentPage.answer}"
                </p>
                
                <p 
                  className="text-stone-200 text-xl leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {currentPage.musing}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <Button
              onClick={goPrev}
              disabled={currentIndex === 0}
              variant="ghost"
              size="icon"
              className="text-stone-500 hover:text-stone-200 hover:bg-stone-800 
                         disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Page indicators */}
            <div className="flex gap-2">
              {sortedPages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-stone-200 w-6' 
                      : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goNext}
              disabled={currentIndex === sortedPages.length - 1}
              variant="ghost"
              size="icon"
              className="text-stone-500 hover:text-stone-200 hover:bg-stone-800
                         disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}