import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "Jun 2026 - Present",
    role: "AI Solutions Engineer / Full-Stack Developer",
    company: "ByaheNow.ph",
    highlights: [
      "Engineered unified BusModel and TripModel data contracts for real-time transit systems",
      "Synchronized cross-platform Flutter apps with a Python Plotly Dash fleet analytics dashboard",
      "Built operational analytics for on-time performance, route capacity, and active delay tracking",
    ],
    tags: ["Flutter", "Python", "Plotly Dash", "Riverpod", "Analytics"],
    accentColor: "var(--primary)",
  },
  {
    period: "Apr 2026 - Jun 2026",
    role: "Engineering Intern",
    company: "CMDSI",
    highlights: [
      "Developed a custom YOLO vehicle verification pipeline with PaddleOCR for Philippine license plates",
      "Authored Python scripts for boom barriers, ticket machines, and ALPR hardware control",
      "Built Flutter monitoring apps connected to Oracle Database through RESTful APIs",
      "Assisted rapid prototyping for BIR-ready intelligent monitoring workflows",
    ],
    tags: ["YOLO", "PaddleOCR", "Flutter", "Oracle DB", "Edge AI"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Oct 2024 - Present",
    role: "Freelance Full-Stack Developer / Technical Consultant",
    company: "Independent",
    highlights: [
      "Designed custom RAG frameworks using LLMs and vector databases for document intelligence",
      "Developed AI agent and API automation workflows to streamline complex data processing",
      "Built real-time computer vision inference models for specialized edge hardware and IoT devices",
    ],
    tags: ["RAG", "LLMs", "Vector DBs", "AI Agents", "Edge Hardware"],
    accentColor: "var(--primary)",
  },
  {
    period: "Jul 2024 - Sep 2024",
    role: "System Developer & Data Analyst Intern",
    company: "yieldWerx Semiconductor",
    highlights: [
      "Engineered SQL-based data pipelines and Python automation for semiconductor analytics",
      "Automated reporting workflows to reduce manual operational overhead",
      "Architected Power BI dashboards that improved access to core operational metrics",
    ],
    tags: ["SQL", "Python", "Power BI", "Automation"],
    accentColor: "var(--secondary)",
  },
  {
    period: "Sep 2023 - Apr 2024",
    role: "Technical VA / Shopify Web Developer",
    company: "LuxeEclat",
    highlights: [
      "Configured backend systems and managed technical web infrastructure for e-commerce deployments",
      "Maintained storefront operations while aligning deliverables with business requirements",
    ],
    tags: ["Shopify", "Web Dev", "E-commerce", "Technical VA"],
    accentColor: "var(--accent)",
  },
  {
    period: "Jul 2023 - Aug 2023",
    role: "IT Infrastructure Intern",
    company: "Bacolod City Government Center (MITCS)",
    highlights: [
      "Diagnosed and resolved hardware and system-level issues for municipal IT infrastructure",
      "Executed maintenance protocols to support continuous operational stability",
    ],
    tags: ["IT Support", "Hardware", "Networking"],
    accentColor: "var(--secondary)",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-4xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Work </span>
            <span style={{ color: "var(--primary)" }}>Experience</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--primary), var(--accent), transparent)" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
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
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
