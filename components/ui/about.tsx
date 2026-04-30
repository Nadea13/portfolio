'use client';

import { motion } from 'framer-motion';
import { Download, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const stats = [
  { value: '>1', keyName: 'experience' as const },
  { value: '5', keyName: 'projects' as const },
  { value: '1', keyName: 'clients' as const },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            {t.about.title}
          </p>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-6">
                {t.about.p1}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {t.about.p2}
              </p>

              <button className="group inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-medium rounded-lg hover:border-primary/40 hover:bg-muted transition-all duration-200">
                {t.about.download_cv}
                <Download size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex lg:flex-col gap-8 lg:gap-6 lg:border-l lg:border-border/40 lg:pl-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.keyName}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.about.stats[stat.keyName]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
