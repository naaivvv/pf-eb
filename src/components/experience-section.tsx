import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "Apr 2026 – Jun 2026",
    role: "AI/IoT Engineering Intern",
    company: "Clever Minds Digital Solutions",
    highlights: [
      "Developed AI-driven IoT solutions and automation workflows",
      "Integrated agentic AI tools for intelligent system prototyping",
      "Collaborated on edge computing deployments and smart device integrations",
    ],
    tags: ["AI/IoT", "Edge Computing", "Agentic AI", "Automation"],
    accentColor: "var(--primary)",
  },
  {
    period: "Oct 2024 – Present",
    role: "Freelance Technical Consultant",
    company: "R&D — Independent",
    highlights: [
      "Architecting comprehensive thesis systems for Master's degree clients",
      "IoT-Based Wireless Control System for Legacy Vehicles via Mobile App",
      "Industrial Stack Gas Analyzer with real-time sensor integration",
      "Embedded systems design and AI-powered solution prototyping",
    ],
    tags: ["Embedded Systems", "AI/ML", "IoT", "R&D"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Jul 2024 – Sep 2024",
    role: "System Developer & Data Analyst Intern",
    company: "yieldWerx Semiconductor",
    highlights: [
      "Designed data-driven software solutions for operational reporting accuracy",
      "Performed SQL database troubleshooting and query optimization",
      "Reduced query latency and ensured data integrity across systems",
    ],
    tags: ["SQL", "Data Analysis", "Python", "Reporting"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Sep 2023 – Apr 2024",
    role: "Shopify Web Developer & Technical VA",
    company: "LuxeEclat",
    highlights: [
      "Managed backend configurations and web content for e-commerce platform",
      "Ensured technical deliverables aligned with business requirements",
      "Implemented responsive designs and optimized storefront performance",
    ],
    tags: ["Shopify", "Web Dev", "E-commerce", "Technical VA"],
    accentColor: "var(--accent)",
  },
  {
    period: "Jul 2023 – Aug 2023",
    role: "IT Support Intern",
    company: "Bacolod City Government (MITCS)",
    highlights: [
      "Provided frontline technical assistance for municipal operations",
      "Hardware troubleshooting and system maintenance",
      "Supported daily IT infrastructure needs across departments",
    ],
    tags: ["IT Support", "Hardware", "Networking"],
    accentColor: "var(--secondary)",
  },
];

export default function ExperienceSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" className="relative w-full min-h-screen overflow-hidden bg-transparent" ref={ref}>
      <div className="relative z-10 max-w-4xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
            }`}
        >
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Work </span>
            <span style={{ color: "var(--primary)" }}>Experience</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--primary), var(--accent), transparent)" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative pl-12 md:pl-20 transition-all duration-700 ${isInView
                    ? "animate-fade-up opacity-100"
                    : "opacity-0 translate-y-6"
                  }`}
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: exp.accentColor,
                    background: "var(--background)",
                    boxShadow: `0 0 10px ${exp.accentColor}`,
                  }}
                />

                {/* Card */}
                <div className="glass rounded-2xl p-6 glass-hover transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} style={{ color: exp.accentColor }} />
                      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: exp.accentColor }}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-[var(--font-display)] tracking-wide mb-1" style={{ color: "var(--foreground)" }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                    {exp.company}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm flex items-start gap-2" style={{ color: "var(--muted-foreground)" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: exp.accentColor }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
