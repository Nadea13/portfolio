import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

// Theme-adaptive CSS tokens matching Hero and Footer exactly
const STYLES = `
.contact-section-wrapper {
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

.contact-glass-pill {
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

.contact-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.contact-smooth-input,
.contact-smooth-textarea {
  border-radius: 28px;
  transition: 
    border-radius 2.5s cubic-bezier(0.25, 1, 0.5, 1),
    background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.04);
}

.contact-smooth-input:hover,
.contact-smooth-textarea:hover {
  border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
  background-color: color-mix(in oklch, var(--card) 90%, transparent);
}

.contact-smooth-input:active,
.contact-smooth-textarea:active {
  transform: scale(0.995);
  transition-duration: 0.15s;
}

.contact-smooth-input:focus,
.contact-smooth-textarea:focus {
  border-radius: 6px !important;
  transform: scale(1.008) translateY(-1px);
  border-color: var(--primary);
  background-color: var(--card);
  box-shadow: 
    0 0 0 4px color-mix(in oklch, var(--primary) 22%, transparent),
    0 16px 32px -8px color-mix(in oklch, var(--primary) 12%, transparent),
    0 4px 12px -2px rgba(0, 0, 0, 0.06);
}
`;

// Magnetic Button Component (identical to Hero and Footer)
type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
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
MagneticButton.displayName = 'MagneticButton';

export function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section id="contact" className="section-padding border-t border-border/40 contact-section-wrapper">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Header & Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex flex-col justify-between h-full"
            >
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                  {t.contact.title}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                  {t.contact.headline}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  {t.contact.subtitle}
                </p>

                {/* Information Cards */}
                <div className="space-y-4">
                  <a
                    href="mailto:nathanon.idea@gmail.com"
                    className="group flex items-center gap-4 p-5 rounded-[24px] md:rounded-[28px] bg-card/60 border border-border/60 hover:border-primary/50 hover:bg-card/90 transition-all duration-300"
                  >
                    <Mail size={22} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium tracking-wide">
                        {t.contact.info_email}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        nathanon.idea@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-5 rounded-[24px] md:rounded-[28px] bg-card/60 border border-border/60">
                    <MapPin size={22} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium tracking-wide">
                        {t.contact.info_location}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-foreground">
                        {t.contact.location_value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability status badge */}
              <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {t.hero.status} • {t.contact.status_desc}
                </span>
              </div>
            </motion.div>

            {/* Right Column: Contact Form (Without enclosing Card) */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t.contact.success_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.contact.success_desc}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
                        {t.contact.name}
                      </label>
                      <input
                        required
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.name_placeholder}
                        className="contact-smooth-input w-full px-5 py-4 bg-card/60 backdrop-blur-md border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
                        {t.contact.email}
                      </label>
                      <input
                        required
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.email_placeholder}
                        className="contact-smooth-input w-full px-5 py-4 bg-card/60 backdrop-blur-md border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
                      {t.contact.message}
                    </label>
                    <textarea
                      required
                      id="contact-message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.message_placeholder}
                      className="contact-smooth-textarea w-full px-5 py-4 bg-card/60 backdrop-blur-md border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 outline-none resize-none"
                    />
                  </div>

                  {/* Glass Pill Magnetic Submit Button (Matching Hero & Footer 100%) */}
                  <div className="pt-2">
                    <MagneticButton
                      as="button"
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-glass-pill w-full sm:w-auto px-10 py-4 rounded-full text-foreground font-semibold text-sm md:text-base flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      <span>{isSubmitting ? t.contact.sending : t.contact.send}</span>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
