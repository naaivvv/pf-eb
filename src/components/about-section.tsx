import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import {
  GraduationCap,
  Award,
  Globe,
  BookOpen,
  Cpu,
  Sparkles,
} from "lucide-react";

const quickStats = [
  { label: "Years Experience", value: "3+", icon: Sparkles },
  { label: "Projects Delivered", value: "10+", icon: Cpu },
  { label: "Languages Spoken", value: "4", icon: Globe },
  { label: "DOST Scholar", value: "✓", icon: Award },
];

const certifications = [
  "STEM Capstone Research Consultant",
  "Data Analysis — ICpEP.se-R6",
  "HSK4 Chinese Proficiency",
  "2× DepEd Technolympics Champion",
  "Class Valedictorian (JHS & SHS)",
  "Google Developer Group Member",
];

export default function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-transparent" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4"
              style={{ color: "var(--foreground)" }}
            >
              About <span style={{ color: "var(--primary)" }}>Me</span>
            </h2>
            <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Summary Card */}
            <div
              className={`lg:col-span-3 glass rounded-2xl p-8 transition-all duration-700 delay-100 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
                }`}
            >
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                Versatile Computer Engineer skilled in bridging the gap between hardware and software development.
                Specialized in creating intelligent applications that analyze data and automate tasks to improve
                safety and decision-making. Strong background in research and development, with a track record
                of delivering successful projects in dynamic, fast-paced environments.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
                Currently pursuing a <span style={{ color: "var(--secondary)" }}>BS in Computer Engineering</span> at
                Technological University of the Philippines - Visayas while actively taking on freelance R&D consulting work — architecting thesis systems
                involving embedded AI, IoT automation, and intelligent monitoring solutions.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl transition-colors duration-300"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: "var(--surface-subtle)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--glass-hover-border)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }}
                  >
                    <stat.icon size={18} className="mx-auto mb-2" style={{ color: "var(--primary)" }} />
                    <div className="text-2xl font-bold font-[var(--font-display)]" style={{ color: "var(--foreground)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certs */}
            <div
              className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-200 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
                }`}
            >
              {/* Education */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--secondary)" }}>
                  <GraduationCap size={16} /> Education
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 pl-4" style={{ borderColor: "var(--primary)" }}>
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      BS Computer Engineering
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Technological University of the Philippines - Visayas · 2022 – Present
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                      Thesis: KidSentry — Hybrid Edge-Cloud AI
                    </div>
                  </div>
                  <div className="border-l-2 pl-4" style={{ borderColor: "var(--accent)" }}>
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      Mandarin Language Program
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Beijing Language & Culture Univ. · 2021 – 2022
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                      HSK4 Proficiency Achieved
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "var(--secondary)" }}>
                  <BookOpen size={16} /> Certifications & Awards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
