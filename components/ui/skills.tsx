'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

const skillData = [
  {
    keyName: 'frontend' as const,
    skills: [
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS3', slug: 'css' },
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Framer Motion', slug: 'framer' },
    ],
  },
  {
    keyName: 'backend' as const,
    skills: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Supabase', slug: 'supabase' },
    ],
  },
  {
    keyName: 'ai' as const,
    skills: [
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'MediaPipe', slug: 'mediapipe' },
    ],
  },
  {
    keyName: 'tools' as const,
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Figma', slug: 'figma' },
    ],
  },
];

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            {t.skills.title}
          </p>
          <p className="text-muted-foreground text-sm">{t.skills.subtitle}</p>
        </motion.div>

        <div className="space-y-0 divide-y divide-border/30">
          {skillData.map((category, idx) => (
            <motion.div
              key={category.keyName}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-6 first:pt-0"
            >
              {/* Category Label */}
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider md:w-40 shrink-0">
                {t.skills.categories[category.keyName]}
              </h3>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.08 + sIdx * 0.03 }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-card border border-border/60 text-foreground/80 rounded-md hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default group/skill"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/currentColor`}
                      alt=""
                      className="w-3.5 h-3.5 opacity-60 group-hover/skill:opacity-100 transition-opacity fill-current"
                    />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
