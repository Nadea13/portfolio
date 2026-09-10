'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

interface SkillItem {
  name: string;
  slug: string;
  customSvg?: boolean;
}

interface SkillCategory {
  keyName: 'frontend' | 'backend' | 'ai' | 'tools';
  skills: SkillItem[];
}

const skillData: SkillCategory[] = [
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
      { name: 'FastAPI', slug: 'fastapi' },
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
      { name: 'Cloudflare', slug: 'cloudflare' },
      { name: 'Figma', slug: 'figma' },
      { name: 'LINE Dev', slug: 'linedev', customSvg: true },
    ],
  },
];

const LineDevelopersIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-transform duration-300"
  >
    <rect width="48" height="48" rx="10" fill="#00C300" />
    <path
      d="M17.5 17L10.5 24L17.5 31"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 33.5L27 14.5"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M30.5 17L37.5 24L30.5 31"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

        <div className="flex flex-col gap-10">
          {skillData.map((category, idx) => (
            <div key={category.keyName} className="flex flex-col gap-4">
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {t.skills.categories[category.keyName]}
                </h3>
              </div>

              {/* Squircle Cards Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 + sIdx * 0.02 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.08,
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-4 aspect-square rounded-[22px] md:rounded-[26px] bg-card/75 border border-border/70 hover:border-primary/60 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 backdrop-blur-md cursor-pointer select-none"
                  >
                    {/* Icon container with natural brand colors */}
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 pointer-events-none">
                      {skill.customSvg ? (
                        <LineDevelopersIcon />
                      ) : (
                        <img
                          src={`https://cdn.simpleicons.org/${skill.slug}`}
                          alt={skill.name}
                          loading="eager"
                          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${skill.slug}/currentColor`;
                          }}
                        />
                      )}
                    </div>

                    {/* Skill Name */}
                    <span className="text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-center tracking-tight truncate max-w-full px-1 pointer-events-none">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
