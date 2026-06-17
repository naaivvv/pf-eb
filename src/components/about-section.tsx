import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  Cpu,
  Sparkles,
  ShieldCheck,
  Trophy,
  Languages,
  MapPin,
  Code2,
  Calendar,
} from "lucide-react";
import portraitImg from "@/assets/portrait.jpeg";

const quickStats = [
  { label: "Years Experience", value: "3+", icon: Sparkles },
  { label: "AI & IoT Builds", value: "15+", icon: Cpu },
  { label: "DOST Scholar", value: "✓", icon: Award },
];

interface Certification {
  title: string;
  issuer: string;
  date: string;
  variant: "default" | "secondary" | "accent" | "outline";
}

const certifications: Certification[] = [
  // Awards & Honors
  { title: "DOST Academic Scholar", issuer: "DOST", date: "", variant: "default" },
  { title: "Class Valedictorian (JHS & SHS)", issuer: "Academic", date: "", variant: "default" },

  // Language & Proficiency
  { title: "HSK Level 4 - Chinese Proficiency", issuer: "BLCU", date: "Jul 2021", variant: "secondary" },

  // Technical Certifications
  { title: "Certified Google AI Professional", issuer: "Google / Coursera", date: "", variant: "accent" },
  { title: "Crash Course in Python", issuer: "Google / Coursera", date: "", variant: "accent" },
  { title: "Advanced Commands in Linux", issuer: "Coursera", date: "", variant: "accent" },
  { title: "Azure AI Fundamentals", issuer: "TESDA / Microsoft", date: "", variant: "accent" },

  // Community & Events
  { title: "2x DepEd Division Technolympics Web Page Designing Champion", issuer: "DepEd", date: "", variant: "outline" },
];

const education = [
  {
    degree: "BS Computer Engineering",
    school: "Technological University of the Philippines - Visayas",
    period: "Sep 2022 - Jun 2026",
    detail: "Thesis: KidSentry — Hybrid Edge-Cloud AI",
    color: "var(--primary)",
    icon: GraduationCap,
  },
  {
    degree: "Mandarin Language Program",
    school: "Beijing Language & Culture Univ.",
    period: "Sep 2020 - Jul 2021",
    detail: "HSK 4 Proficiency Achieved",
    color: "var(--accent)",
    icon: Languages,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4"
              style={{ color: "var(--foreground)" }}
            >
              About <span style={{ color: "var(--primary)" }}>Me</span>
            </h2>
            <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
          </motion.div>

          {/* ─── Top Row: Portrait + Summary ─── */}
          <motion.div
            className="grid lg:grid-cols-12 gap-8 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {/* Portrait Card */}
            <div className="lg:col-span-4 flex">
              <div
                className="relative glass rounded-2xl p-1.5 overflow-hidden w-full"
                style={{ border: "1px solid var(--glass-border)" }}
              >
                <img
                  src={portraitImg}
                  alt="Edwin Jr. P. Bayog — Computer Engineer"
                  className="w-full h-full rounded-xl object-cover"
                  loading="lazy"
                  width={280}
                  height={373}
                />
                {/* Overlay info strip */}
                <div
                  className="absolute bottom-2 left-2 right-2 rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: "#fff" }}>
                      Edwin Jr. P. Bayog
                    </div>
                    <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Computer Engineer
                    </div>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full shrink-0 animate-glow-pulse"
                    style={{ background: "var(--accent)" }}
                  />
                </div>
              </div>
            </div>

            {/* Summary + Stats */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6">
              <div className="glass rounded-2xl p-8">
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                  Computer Engineer focused on building AI systems that integrate LLM orchestration, edge AI,
                  workflow automation, and real-time hardware interaction. I develop intelligent pipelines that
                  combine computer vision, embedded systems, and autonomous decision-making.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  My work spans production full-stack systems, RAG frameworks, AI automation workflows, and
                  embedded deployments on devices like Raspberry Pi, ESP32, STM32, and Arduino, with a strong
                  bias toward practical systems that can operate in the field.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl glass transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      border: "1px solid var(--border-subtle)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--glass-hover-border)";
                      e.currentTarget.style.boxShadow = "0 0 20px var(--glass-hover-shadow)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.boxShadow = "none";
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
          </motion.div>

          {/* ─── Bottom Row: Education + Certifications ─── */}
          <motion.div
            className="grid lg:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Education */}
            <div className="lg:col-span-5">
              <div className="glass rounded-2xl p-6 h-full">
                <h3
                  className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "var(--secondary)" }}
                >
                  <GraduationCap size={16} /> Education
                </h3>
                <div className="space-y-5">
                  {education.map((edu) => (
                    <div key={edu.degree} className="relative border-l-2 pl-5" style={{ borderColor: edu.color }}>
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {edu.degree}
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        <MapPin size={10} className="shrink-0" />
                        {edu.school}
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        <Calendar size={10} className="shrink-0" />
                        {edu.period}
                      </div>
                      <div
                        className="text-xs mt-2 px-2.5 py-1 rounded-md inline-block"
                        style={{
                          color: "var(--foreground)",
                          background: "var(--surface-subtle)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {edu.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="lg:col-span-7">
              <div className="glass rounded-2xl p-6 h-full">
                <h3
                  className="font-[var(--font-display)] text-sm font-semibold tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "var(--secondary)" }}
                >
                  <BookOpen size={16} /> Certifications & Awards
                </h3>

                {/* Category legend */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Trophy size={12} style={{ color: "var(--primary)" }} />
                    <span>Awards</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Languages size={12} style={{ color: "var(--secondary)" }} />
                    <span>Language</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <ShieldCheck size={12} style={{ color: "var(--accent)" }} />
                    <span>Technical</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Code2 size={12} style={{ color: "var(--foreground)" }} />
                    <span>Community</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Badge
                      key={cert.title}
                      variant={cert.variant}
                      className="text-xs py-1 px-3 cursor-default transition-all duration-200 hover:scale-105"
                      title={cert.date ? `${cert.issuer} · ${cert.date}` : cert.issuer}
                    >
                      {cert.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
