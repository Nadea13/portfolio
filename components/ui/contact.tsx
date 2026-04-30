import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { motion } from 'framer-motion';

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
    <section id="contact" className="section-padding border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {t.contact.title}
            </p>
            <p className="text-muted-foreground text-sm">{t.contact.subtitle}</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 mb-8 pb-8 border-b border-border/30"
          >
            <a
              href="mailto:nathanon.idea@gmail.com"
              className="group flex items-center gap-3 hover:text-primary transition-colors"
            >
              <div className="p-2 rounded-md bg-card border border-border/60 group-hover:border-primary/40 transition-colors">
                <Mail size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{t.contact.info_email}</p>
                <p className="text-sm font-medium">nathanon.idea@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-card border border-border/60">
                <MapPin size={14} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{t.contact.info_location}</p>
                <p className="text-sm font-medium">{t.contact.location_value}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t.contact.name}
                  </label>
                  <input
                    required
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.name_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t.contact.email}
                  </label>
                  <input
                    required
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.email_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.contact.message}
                </label>
                <textarea
                  required
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.message_placeholder}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : t.contact.send}
                {!isSubmitting && <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
