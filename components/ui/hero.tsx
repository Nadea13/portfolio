'use client';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/language-context';

interface FloatingIconConfig {
  name: string;
  slug: string;
  top: string;
  left: string;
  size?: number;
  initialRotate?: number;
  customSvg?: boolean;
}

const FLOATING_ICONS: FloatingIconConfig[] = [
  // Top left
  { name: 'React', slug: 'react', top: '12%', left: '7%', size: 76, initialRotate: -6 },
  // Top center-left
  { name: 'Next.js', slug: 'nextdotjs', top: '6%', left: '26%', size: 84, initialRotate: 4 },
  // Top center
  { name: 'TypeScript', slug: 'typescript', top: '5%', left: '50%', size: 72, initialRotate: 6 },
  // Top center-right
  { name: 'Tailwind CSS', slug: 'tailwindcss', top: '7%', left: '73%', size: 74, initialRotate: -5 },
  // Far upper right
  { name: 'Node.js', slug: 'nodedotjs', top: '16%', left: '87%', size: 78, initialRotate: 10 },
  // Middle right
  { name: 'Supabase', slug: 'supabase', top: '34%', left: '77%', size: 72, initialRotate: -8 },
  // Center right
  { name: 'Docker', slug: 'docker', top: '54%', left: '89%', size: 80, initialRotate: 6 },
  // Lower right
  { name: 'Cloudflare', slug: 'cloudflare', top: '74%', left: '73%', size: 74, initialRotate: -10 },
  // Bottom far right
  { name: 'PostgreSQL', slug: 'postgresql', top: '83%', left: '86%', size: 70, initialRotate: 5 },
  // Bottom center-right
  { name: 'Vercel', slug: 'vercel', top: '88%', left: '67%', size: 78, initialRotate: 6 },
  // Bottom center
  { name: 'Git', slug: 'git', top: '90%', left: '48%', size: 72, initialRotate: -4 },
  // Bottom center-left
  { name: 'Figma', slug: 'figma', top: '87%', left: '26%', size: 74, initialRotate: 2 },
  // Lower left
  { name: 'TensorFlow', slug: 'tensorflow', top: '79%', left: '9%', size: 74, initialRotate: -8 },
  // Mid left
  { name: 'MediaPipe', slug: 'mediapipe', top: '60%', left: '3%', size: 70, initialRotate: 7 },
  // Middle left
  { name: 'HTML5', slug: 'html5', top: '40%', left: '11%', size: 76, initialRotate: -5 },
  // Center-left-bottom
  { name: 'MySQL', slug: 'mysql', top: '63%', left: '28%', size: 74, initialRotate: 4 },
  // Additional frontend/motion icon
  { name: 'Framer Motion', slug: 'framer', top: '37%', left: '88%', size: 68, initialRotate: -6 },
];

function ElasticIcon({
  icon,
  index,
  mousePos,
  containerRef,
}: {
  icon: FloatingIconConfig;
  index: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Motion values for offset displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft elastic rubber-band spring physics: lower damping & higher responsiveness
  const springX = useSpring(x, { stiffness: 170, damping: 11, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 170, damping: 11, mass: 0.7 });

  useEffect(() => {
    let animFrame: number;

    const updatePhysics = () => {
      if (iconRef.current && containerRef.current) {
        const iconRect = iconRef.current.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width / 2;
        const iconCenterY = iconRect.top + iconRect.height / 2;

        const dx = iconCenterX - mousePos.current.x;
        const dy = iconCenterY - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel radius: within 200px the item glides away smoothly
        const repelRadius = 200;
        if (dist < repelRadius && dist > 0) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 1.2);
          const maxPush = 100; // Max rubber-band stretch distance
          const pushX = (dx / dist) * force * maxPush;
          const pushY = (dy / dist) * force * maxPush;
          x.set(pushX);
          y.set(pushY);
        } else {
          // Snap and oscillate back like a real elastic rubber band
          x.set(0);
          y.set(0);
        }
      }
      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos, containerRef, x, y]);

  // Unique timing offsets per icon so they don't move in sync
  const floatDuration = 4.5 + (index % 4) * 0.8;
  const floatDelay = (index * 0.35) % 2.5;

  return (
    <motion.div
      ref={iconRef}
      style={{
        top: icon.top,
        left: icon.left,
        x: springX,
        y: springY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15 + (index * 0.04) }}
      className="absolute z-10 select-none cursor-pointer"
    >
      {/* Organic floating wave animation: X + Y + Tilt */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-6, 6, -6],
          rotate: [
            (icon.initialRotate ?? 0) - 5,
            (icon.initialRotate ?? 0) + 5,
            (icon.initialRotate ?? 0) - 5,
          ],
        }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.18, rotate: 0 }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center rounded-[24px] md:rounded-[28px] bg-card/85 border border-border/70 shadow-[0_18px_38px_-10px_rgba(0,0,0,0.16)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl p-3.5 md:p-4 transition-all duration-300 hover:shadow-[0_28px_50px_-12px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_28px_55px_-12px_rgba(0,0,0,0.9)] aspect-square"
        style={{
          width: icon.size ?? 74,
          height: icon.size ?? 74,
        }}
      >
        <img
          src={`https://cdn.simpleicons.org/${icon.slug}`}
          alt={icon.name}
          className="w-full h-full object-contain pointer-events-none filter drop-shadow-md transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${icon.slug}/currentColor`;
          }}
        />
      </motion.div>
    </motion.div>
  );
}

import { cn } from '@/lib/utils';

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Identical to Footer)
// -------------------------------------------------------------------------
const HERO_STYLES = `
.hero-glass-wrapper {
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--primary) 40%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
`;

// ─── Magnetic Button Component (identical to Footer) ──────────────────────────
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    href?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.05,
            ease: 'power2.out',
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1.2,
          });
        };

        element.addEventListener('mousemove', handleMouseMove as EventListener);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          element.removeEventListener('mousemove', handleMouseMove as EventListener);
          element.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          if (localRef) {
            (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        className={cn('cursor-pointer', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = 'HeroMagneticButton';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -9999, y: -9999 };
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero-glass-wrapper relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-16 px-6"
      >
        {/* Theme-adaptive Ambient Light & Grid Background (matching Footer) */}
        <div className="hero-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-0" />
        <div className="hero-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Floating Elastic Rubber-band Icons */}
        <div className="absolute inset-0 pointer-events-auto overflow-hidden z-10">
          {FLOATING_ICONS.map((icon, index) => (
            <ElasticIcon
              key={icon.name}
              icon={icon}
              index={index}
              mousePos={mousePos}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Center Main Content (According to mockup) */}
        <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border/60 bg-card/80 backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-muted-foreground font-medium">{t.hero.status}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.2] whitespace-normal sm:whitespace-nowrap"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed font-normal"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs Button (matching Footer glass pill + Magnetic animation) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <MagneticButton
              as={Link}
              href="#projects"
              className="footer-glass-pill px-8 py-4 md:px-10 md:py-5 rounded-full text-foreground font-semibold text-sm md:text-base flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>{t.hero.cta_work}</span>
              <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
            <MagneticButton
              as={Link}
              href="#contact"
              className="footer-glass-pill px-8 py-4 md:px-10 md:py-5 rounded-full text-foreground font-semibold text-sm md:text-base flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{t.hero.cta_contact}</span>
            </MagneticButton>
          </motion.div>
        </div>

      {/* Scroll hint line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent" />
      </motion.div>
    </section>
  </>
);
}

