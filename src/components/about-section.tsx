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
import portraitImg from "@/assets/portrait.png";

const quickStats = [
  { label: "Years Experience", value: "3+", icon: Sparkles },
  { label: "Projects Delivered", value: "10+", icon: Cpu },
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
  { title: "2× DepEd Division Technolympics Web Page Designing Contest Champion", issuer: "DepEd", date: "", variant: "default" },
  { title: "Class Valedictorian (JHS & SHS)", issuer: "Academic", date: "", variant: "default" },
  { title: "DOST-SEI JLSS Scholar", issuer: "DOST", date: "", variant: "default" },

  // Language & Proficiency
  { title: "HSK Level 4 — Chinese Proficiency", issuer: "CLEC", date: "Dec 2021", variant: "secondary" },

  // Technical Certifications
  { title: "Vibe Coding — L2: Silver", issuer: "Lovable", date: "Mar 2026", variant: "accent" },
  { title: "Career Accelerator: Technical Skills That Actually Matter", issuer: "TUP", date: "Feb 2026", variant: "accent" },
  { title: "The Multi-Hyphenate Engineer — Beyond the Code", issuer: "TUP", date: "Mar 2026", variant: "accent" },
  { title: "Digital Footprint: Impact of CpE on Modern Society", issuer: "TUP", date: "Feb 2026", variant: "accent" },
  { title: "GIS Techniques & Spatial Data Analysis", issuer: "ICpEP.se-R6", date: "Mar 2023", variant: "accent" },

  // Community & Events
  { title: "Google DevFest 2023 Attendee", issuer: "GDG", date: "Oct 2023", variant: "outline" },
  { title: "STEM Capstone Research Consultant", issuer: "Academic", date: "", variant: "outline" },
];

const education = [
  {
    degree: "BS Computer Engineering",
    school: "Technological University of the Philippines - Visayas",
    period: "2022 – Present",
    detail: "Thesis: KidSentry — Hybrid Edge-Cloud AI",
    color: "var(--primary)",
    icon: GraduationCap,
  },
  {
    degree: "Mandarin Language Program",
    school: "Beijing Language & Culture Univ.",
    period: "2021 – 2022",
    detail: "HSK4 Proficiency Achieved",
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
                  Versatile Computer Engineer skilled in bridging the gap between hardware and software development.
                  Specialized in creating intelligent applications that analyze data and automate tasks to improve
                  safety and decision-making. Strong background in research and development, with a track record
                  of delivering successful projects in dynamic, fast-paced environments.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  Currently pursuing a{" "}
                  <span style={{ color: "var(--secondary)" }}>BS in Computer Engineering</span> at
                  Technological University of the Philippines - Visayas while actively taking on freelance R&D consulting work — architecting thesis systems
                  involving embedded AI, IoT automation, and intelligent monitoring solutions.
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
