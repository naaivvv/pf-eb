import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b shadow-lg"
          : "bg-transparent"
      )}
      style={{
        borderColor: scrolled ? "var(--border-subtle)" : "transparent",
        boxShadow: scrolled
          ? (isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)")
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-[var(--font-display)] text-lg font-bold tracking-wider"
            style={{ color: "var(--primary)" }}
          >
            EB<span className="text-[var(--secondary)]">.</span>
          </a>

          {/* Desktop Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  activeSection === link.href
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle-hover)]"
                )}
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                color: "var(--muted-foreground)",
                background: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--glass-hover-border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={{
                color: "var(--muted-foreground)",
                background: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="p-2 cursor-pointer"
              style={{ color: "var(--muted-foreground)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass animate-fade-in" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                  activeSection === link.href
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle-hover)]"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
