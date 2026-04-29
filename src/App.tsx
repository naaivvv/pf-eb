import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import { useTheme } from "@/hooks/use-theme";

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-dvh" style={{ color: "var(--foreground)" }}>
      {/* Global Thermodynamic Background — single canvas for entire site */}
      <div className="fixed inset-0 z-[-1]">
        <ThermodynamicGrid
          resolution={12}
          coolingFactor={0.96}
          className="w-full h-full"
        />
        {/* Global gradient overlay for depth and contrast */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{
            background: `linear-gradient(to bottom, var(--gradient-overlay-from), var(--gradient-overlay-via), var(--gradient-overlay-to))`,
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content — transparent so global grid shows through */}
      <main className="relative z-10 bg-transparent">
        <HeroSection isDark={isDark} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection isDark={isDark} />
        <ContactSection />
      </main>
    </div>
  );
}
