import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';

export default function QuestionCard({ question, questionNumber, onSubmit, isLoading }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Question number */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 flex items-center gap-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 font-light">
          Question {questionNumber}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-stone-700 to-transparent" />
      </motion.div>

      {/* The question */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-100 leading-relaxed mb-12"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {question}
      </motion.h2>

      {/* Answer input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Speak your truth..."
          className="w-full min-h-[140px] bg-transparent border-stone-700 focus:border-stone-500 
                     text-stone-200 placeholder:text-stone-600 resize-none text-lg
                     focus:ring-0 focus:ring-offset-0 rounded-none border-0 border-b
                     transition-all duration-500"
          style={{ fontFamily: 'Georgia, serif' }}
          disabled={isLoading}
        />

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isLoading}
            className="group bg-transparent border border-stone-600 text-stone-300 
                       hover:bg-stone-100 hover:text-stone-900 hover:border-stone-100
                       rounded-none px-8 py-6 text-sm tracking-wider uppercase
                       transition-all duration-500 disabled:opacity-30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                Conjuring...
              </>
            ) : (
              <>
                Reveal
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}