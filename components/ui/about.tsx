'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function About() {
  const { t, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const fullTextP1 = t.about.p1;
  const fullTextP2 = t.about.p2;

  const [displayedP1, setDisplayedP1] = useState('');
  const [displayedP2, setDisplayedP2] = useState('');
  const [currentStage, setCurrentStage] = useState<'idle' | 'typing-p1' | 'typing-p2' | 'finished'>('idle');

  useEffect(() => {
    if (!isInView) return;

    // Reset and start typing when in view or language changed
    let active = true;
    setCurrentStage('typing-p1');

    let idx1 = 0;
    let idx2 = 0;

    const typeSpeed = 12; // ms per char

    const interval1 = setInterval(() => {
      if (!active) return;
      if (idx1 < fullTextP1.length) {
        idx1++;
        setDisplayedP1(fullTextP1.slice(0, idx1));
      } else {
        clearInterval(interval1);
        setCurrentStage('typing-p2');

        const interval2 = setInterval(() => {
          if (!active) return;
          if (idx2 < fullTextP2.length) {
            idx2++;
            setDisplayedP2(fullTextP2.slice(0, idx2));
          } else {
            clearInterval(interval2);
            setCurrentStage('finished');
          }
        }, typeSpeed);

        return () => clearInterval(interval2);
      }
    }, typeSpeed);

    return () => {
      active = false;
      clearInterval(interval1);
    };
  }, [isInView, locale, fullTextP1, fullTextP2]);

  return (
    <section id="about" className="section-padding border-t border-border/40">
      <div ref={containerRef} className="max-w-4xl mx-auto px-6">
        <motion.div
          key={t.about.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">
            {t.about.title}
          </p>

          {/* Real Typewriter Content */}
          <div className="space-y-6">
            {/* Paragraph 1 */}
            <p className="text-lg md:text-2xl font-normal leading-relaxed text-foreground min-h-[4rem]">
              {displayedP1}
              {currentStage === 'typing-p1' && (
                <span className="inline-block w-[3px] h-6 bg-primary ml-1 translate-y-1 animate-pulse" />
              )}
            </p>

            {/* Paragraph 2 */}
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground min-h-[3rem]">
              {displayedP2}
              {(currentStage === 'typing-p2' || currentStage === 'finished') && (
                <span className="inline-block w-[2.5px] h-5 bg-primary ml-1 translate-y-0.5 animate-pulse" />
              )}
            </p>

            {/* Download CV button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={currentStage === 'finished' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="pt-4"
            >
              <button className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                {t.about.download_cv}
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
