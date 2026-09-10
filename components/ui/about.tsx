'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-10">
            {/* Main Info Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-card/70 border border-border/60 backdrop-blur-md shadow-lg shadow-black/5">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-5 text-foreground">
                {t.about.p1}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {t.about.p2}
              </p>

              <button className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                {t.about.download_cv}
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.keyName}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 md:p-6 rounded-2xl bg-card/70 border border-border/60 backdrop-blur-md shadow-lg shadow-black/5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left min-w-[140px]"
                >
                  <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">{t.about.stats[stat.keyName]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
