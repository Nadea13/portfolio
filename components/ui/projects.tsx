'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const projectMeta = [
  {
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    link: 'https://leagueflow.vercel.app',
    github: 'https://github.com/Nadea13/leagueflow',
    image: '/projects/leagueflow_logo.png',
  },
  {
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    link: 'https://etre-nine.vercel.app',
    github: 'https://github.com/Nadea13/etre',
    image: '/projects/etre_logo.png',
  }
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-padding border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            {t.projects.title}
          </p>
          <p className="text-muted-foreground text-sm">{t.projects.subtitle}</p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-12">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Project Image */}
              <div>
                <a
                  href={projectMeta[index].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 bg-muted"
                >
                  <img
                    src={projectMeta[index].image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Project Info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {projectMeta[index].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium bg-muted text-muted-foreground rounded-md border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={projectMeta[index].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
                  >
                    {t.projects.live} <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={projectMeta[index].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-card border border-border text-sm font-semibold rounded-lg hover:bg-muted transition-all"
                  >
                    <Github size={14} /> {t.projects.code}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
