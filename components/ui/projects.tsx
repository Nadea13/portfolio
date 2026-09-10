'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { ProjectShowcase, type ProjectItem } from '@/components/ui/project-showcase';

const projectMeta = [
  {
    year: '2025',
    link: 'https://leagueflow.vercel.app',
    image: '/projects/leagueflow_logo.png',
  },
  {
    year: '2025',
    link: 'https://etre-nine.vercel.app',
    image: '/projects/etre_logo.png',
  },
  {
    year: '2026',
    link: 'https://q-flow-omega.vercel.app',
    image: '/projects/qflow_logo.png',
  }
];

export function Projects() {
  const { t } = useLanguage();

  const formattedProjects: ProjectItem[] = t.projects.items.map((item, index) => ({
    title: item.title,
    description: item.description,
    year: projectMeta[index]?.year || '2024',
    link: projectMeta[index]?.link || '#',
    image: projectMeta[index]?.image || '/placeholder.svg',
  }));

  return (
    <section id="projects" className="section-padding border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            {t.projects.title}
          </p>
          <p className="text-muted-foreground text-sm">{t.projects.subtitle}</p>
        </motion.div>

        {/* Project Showcase List */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <ProjectShowcase projects={formattedProjects} />
        </motion.div>
      </div>
    </section>
  );
}

