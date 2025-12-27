import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import IntroScreen from '@/components/zine/IntroScreen';
import QuestionCard from '@/components/zine/QuestionCard';
import ZinePageReveal from '@/components/zine/ZinePageReveal';
import ZineGallery from '@/components/zine/ZineGallery';

const UNSETTLING_QUESTIONS = [
  "What is something you pretend not to remember, but think about often?",
  "If your conscience had a face, what expression would it wear when looking at you?",
  "What is the kindest lie you've ever told yourself to survive?",
  "Describe a version of yourself that only exists when no one is watching.",
  "What do you fear will be true about you, long after you're gone?"
];

export default function Home() {
  const [phase, setPhase] = useState('intro'); // intro, questioning, reveal, gallery
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionPages, setSessionPages] = useState([]);

  const queryClient = useQueryClient();

  const { data: allPages = [] } = useQuery({
    queryKey: ['zinePages'],
    queryFn: () => base44.entities.ZinePage.list('-created_date'),
  });

  const createPageMutation = useMutation({
    mutationFn: (data) => base44.entities.ZinePage.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zinePages'] });
    },
  });

  const handleStart = () => {
    setPhase('questioning');
    setCurrentQuestionIndex(0);
    setSessionPages([]);
  };

  const handleAnswerSubmit = async (answer) => {
    setIsGenerating(true);
    const question = UNSETTLING_QUESTIONS[currentQuestionIndex];
    
    // Generate musing
    const musingResponse = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a poet writing for a dark, introspective zine. Given this unsettling question and the person's answer, write a haunting, poetic musing (2-3 sentences max). Be evocative, slightly unsettling, and profound. Do not be cliche. Do not repeat their answer back.

Question: "${question}"
Answer: "${answer}"

Write the musing:`,
    });

    // Generate image
    const imageResponse = await base44.integrations.Core.GenerateImage({
      prompt: `Abstract surrealist art, dark moody atmosphere, inspired by this introspective confession: "${answer}". Style: black and white illustration, textured, dreamlike, unsettling beauty, fine art quality, dramatic lighting, shadows`
    });

    const pageData = {
      question,
      answer,
      musing: musingResponse,
      image_url: imageResponse.url,
      page_number: currentQuestionIndex + 1
    };

    const createdPage = await createPageMutation.mutateAsync(pageData);
    setCurrentPage({ ...pageData, id: createdPage.id });
    setSessionPages(prev => [...prev, { ...pageData, id: createdPage.id }]);
    setIsGenerating(false);
    setPhase('reveal');
  };

  const handleContinue = () => {
    if (currentQuestionIndex < UNSETTLING_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setPhase('questioning');
    } else {
      setPhase('gallery');
    }
  };

  const handleRestart = () => {
    setPhase('intro');
    setCurrentQuestionIndex(0);
    setCurrentPage(null);
    setSessionPages([]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-stone-950 via-stone-900/50 to-stone-950 pointer-events-none" />
      
      {/* Grain texture */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <IntroScreen key="intro" onStart={handleStart} />
          )}

          {phase === 'questioning' && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              className="min-h-screen flex items-center justify-center px-6 py-20"
            >
              <QuestionCard
                question={UNSETTLING_QUESTIONS[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                onSubmit={handleAnswerSubmit}
                isLoading={isGenerating}
              />
            </motion.div>
          )}

          {phase === 'reveal' && currentPage && (
            <motion.div
              key="reveal"
              className="min-h-screen flex items-center justify-center px-6 py-20"
            >
              <ZinePageReveal
                page={currentPage}
                onContinue={handleContinue}
                isLast={currentQuestionIndex === UNSETTLING_QUESTIONS.length - 1}
              />
            </motion.div>
          )}

          {phase === 'gallery' && (
            <ZineGallery
              key="gallery"
              pages={sessionPages.length > 0 ? sessionPages : allPages}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator (during questioning/reveal) */}
      {(phase === 'questioning' || phase === 'reveal') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 h-0.5 bg-stone-900"
        >
          <motion.div
            className="h-full bg-stone-600"
            initial={{ width: `${(currentQuestionIndex / UNSETTLING_QUESTIONS.length) * 100}%` }}
            animate={{ 
              width: phase === 'reveal' 
                ? `${((currentQuestionIndex + 1) / UNSETTLING_QUESTIONS.length) * 100}%`
                : `${(currentQuestionIndex / UNSETTLING_QUESTIONS.length) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </div>
  );
}