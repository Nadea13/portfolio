'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright.replace('{year}', String(year))}
            </p>
            <span className="hidden md:block w-px h-3 bg-border" />
            <p className="text-xs text-muted-foreground/40">{t.footer.built_with}</p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/nadea13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathanon-boonprom-746219282/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:nathanon.idea@gmail.com"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>

            <span className="w-px h-3 bg-border mx-1" />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
