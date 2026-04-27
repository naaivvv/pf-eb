import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import { Mail, ArrowUpRight } from "lucide-react";

// Custom SVG icons for brand logos (lucide-react dropped brand icons)
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);


const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/naaivvv",
    icon: GithubIcon,
    color: "var(--foreground)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/edwinbayog07/",
    icon: LinkedinIcon,
    color: "var(--secondary)",
  },
  {
    label: "Email",
    href: "mailto:edwinbayog22@gmail.com",
    icon: Mail,
    color: "var(--primary)",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/naaaivvv/",
    icon: FacebookIcon,
    color: "var(--accent)",
  },
];

export default function ContactSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="section-padding grid-pattern" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Let's Build </span>
            <span style={{ color: "var(--primary)" }}>Together</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-6" style={{ background: "var(--primary)" }} />
          <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Whether it's an Edge AI prototype, an automated workflow, or a full-stack web application —
            I'm always open to challenging projects and collaborations.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${
            isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <a href="mailto:edwinbayog22@gmail.com">
            <Button size="lg" className="animate-glow-pulse font-[var(--font-display)] tracking-wider uppercase text-sm gap-2">
              <Mail size={16} /> Get In Touch
              <ArrowUpRight size={14} />
            </Button>
          </a>
        </div>

        {/* Social Links */}
        <div
          className={`flex justify-center gap-4 flex-wrap transition-all duration-700 delay-300 ${
            isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon
                size={18}
                className="group-hover:scale-110 transition-transform duration-300"
                style={{ color: link.color }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`mt-20 pt-8 border-t border-white/5 transition-all duration-700 delay-400 ${
            isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © {new Date().getFullYear()} Edwin Jr. P. Bayog · Crafted with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
