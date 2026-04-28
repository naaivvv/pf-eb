import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import {
  Brain,
  Bot,
  Workflow,
  Globe,
  Database,
  Cpu,
} from "lucide-react";

const skillDomains = [
  {
    title: "AI / Machine Learning",
    icon: Brain,
    color: "var(--primary)",
    skills: ["YOLO", "TensorFlow", "OpenCV", "Edge AI", "Computer Vision", "LLM APIs", "ElevenLabs"],
    gridClass: "md:col-span-2",
  },
  {
    title: "Agentic Development",
    icon: Bot,
    color: "var(--secondary)",
    skills: ["LLM API Integration", "RAG Systems", "AI Agent Architectures", "Prompt Engineering", "Langchain", "CrewAI", "Claude Code", "Antigravity", "Lovable", "Google Stitch"],
    gridClass: "md:col-span-1",
  },
  {
    title: "Workflow Automation",
    icon: Workflow,
    color: "var(--accent)",
    skills: ["N8n Automation", "Shell Scripting", "CI/CD Pipelines", "IoT Integration", "Task Orchestration", "SaaS"],
    gridClass: "md:col-span-1",
  },
  {
    title: "Web Development",
    icon: Globe,
    color: "var(--secondary)",
    skills: ["React.js", "Next.js", "Node.js", "Laravel/PHP", "Tailwind CSS", "Shopify", "Flutter"],
    gridClass: "md:col-span-1",
  },
  {
    title: "Data & Backend",
    icon: Database,
    color: "var(--primary)",
    skills: ["Python", "SQL", "Git/GitHub", "Linux", "Docker", "Virtual Environments", "Power BI", "Render"],
    gridClass: "md:col-span-1",
  },
  {
    title: "Hardware & Embedded",
    icon: Cpu,
    color: "var(--accent)",
    skills: ["PCB Design", "Embedded Systems", "IoT Devices", "Raspberry Pi", "Microcontrollers", "Sensor Integration"],
    gridClass: "md:col-span-2",
  },
];

export default function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" className="relative w-full min-h-screen overflow-hidden bg-transparent" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
            }`}
        >
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Tech </span>
            <span style={{ color: "var(--primary)" }}>Arsenal</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {skillDomains.map((domain, i) => (
            <div
              key={domain.title}
              className={`${domain.gridClass} glass rounded-2xl p-6 glass-hover transition-all duration-500 group ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
                }`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `color-mix(in srgb, ${domain.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${domain.color} 20%, transparent)`,
                  }}
                >
                  <domain.icon size={20} style={{ color: domain.color }} />
                </div>
                <h3
                  className="font-[var(--font-display)] text-sm font-semibold tracking-wider uppercase"
                  style={{ color: domain.color }}
                >
                  {domain.title}
                </h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs hover:border-white/20 transition-colors duration-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages Row */}
        <div
          className={`mt-8 glass rounded-2xl p-6 text-center transition-all duration-700 delay-500 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
            }`}
        >
          <h3 className="font-[var(--font-display)] text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted-foreground)" }}>
            Languages Spoken
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { lang: "English", level: "Fluent" },
              { lang: "Tagalog", level: "Native" },
              { lang: "Mandarin", level: "HSK4" },
              { lang: "Nihongo", level: "Basic" },
            ].map((l) => (
              <div key={l.lang} className="text-center">
                <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {l.lang}
                </div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {l.level}
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
