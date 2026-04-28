import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";

export default function App() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/40 to-[#0a0a0f]/90 pointer-events-none" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content — transparent so global grid shows through */}
      <main className="relative z-10 bg-transparent">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
