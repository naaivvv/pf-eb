import { useInView } from "@/hooks/use-in-view";

// --- SKILL DATA ---
// `cdn` = Simple Icons slug (fetched from CDN)
// `local` = path in public/icons/ (for brands not on Simple Icons)
// `color` = official brand hex color for the icon
type Skill = {
  name: string;
  color: string;
} & ({ cdn: string; local?: never } | { local: string; cdn?: never });

const allSkills: Skill[] = [
  // AI / ML
  { name: "TensorFlow", cdn: "tensorflow", color: "#FF6F00" },
  { name: "OpenCV", cdn: "opencv", color: "#5C3EE8" },
  { name: "PyTorch", cdn: "pytorch", color: "#EE4C2C" },
  { name: "LangChain", cdn: "langchain", color: "#FFFFFF" },
  { name: "CrewAI", cdn: "crewai", color: "#FF4A00" },
  { name: "ElevenLabs", cdn: "elevenlabs", color: "#FFFFFF" },

  // Web & Mobile
  { name: "React", cdn: "react", color: "#61DAFB" },
  { name: "Next.js", cdn: "nextdotjs", color: "#FFFFFF" },
  { name: "Node.js", cdn: "nodedotjs", color: "#5FA04E" },
  { name: "Flutter", cdn: "flutter", color: "#02569B" },
  { name: "Laravel", cdn: "laravel", color: "#FF2D20" },
  { name: "Tailwind CSS", cdn: "tailwindcss", color: "#06B6D4" },
  { name: "Vite", cdn: "vite", color: "#646CFF" },

  // Languages & Backend
  { name: "Python", cdn: "python", color: "#3776AB" },
  { name: "TypeScript", cdn: "typescript", color: "#3178C6" },
  { name: "C++", cdn: "cplusplus", color: "#00599C" },
  { name: "PHP", cdn: "php", color: "#777BB4" },
  { name: "MySQL", cdn: "mysql", color: "#4479A1" },
  { name: "Docker", cdn: "docker", color: "#2496ED" },
  { name: "Git", cdn: "git", color: "#F05032" },
  { name: "GitHub", cdn: "github", color: "#FFFFFF" },
  { name: "Linux", cdn: "linux", color: "#FCC624" },
  { name: "Firebase", cdn: "firebase", color: "#DD2C00" },
  { name: "Supabase", cdn: "supabase", color: "#3FCF8E" },

  // Hardware & IoT
  { name: "Raspberry Pi", cdn: "raspberrypi", color: "#A22846" },
  { name: "Arduino", cdn: "arduino", color: "#00878F" },
  { name: "ESP32", cdn: "espressif", color: "#E7352C" },

  // Platforms & Tools
  { name: "Figma", cdn: "figma", color: "#F24E1E" },
  { name: "Vercel", cdn: "vercel", color: "#FFFFFF" },
  { name: "Shopify", cdn: "shopify", color: "#7AB55C" },
  { name: "N8n", cdn: "n8n", color: "#EA4B71" },
  { name: "Render", cdn: "render", color: "#FFFFFF" },
  { name: "Claude Code", cdn: "claude", color: "#D97757" },

  // Local fallbacks (not on Simple Icons)
  { name: "Power BI", local: "/icons/powerbi.svg", color: "#F2C811" },
  { name: "Lovable", local: "/icons/lovable.svg", color: "#FF5757" },
  { name: "Antigravity", local: "/icons/antigravity.svg", color: "#4285F4" },
  { name: "Google Stitch", cdn: "google", color: "#4285F4" },
];

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

function getIconSrc(skill: Skill): string {
  if (skill.local) return skill.local;
  return `${SIMPLE_ICONS_CDN}/${skill.cdn}/${skill.color.replace("#", "")}`;
}

export default function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" className="relative w-full min-h-screen overflow-hidden bg-transparent" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">

          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"}`}
          >
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
              <span style={{ color: "var(--foreground)" }}>Tech </span>
              <span style={{ color: "var(--primary)" }}>Arsenal</span>
            </h2>
            <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: "var(--primary)" }} />
            <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Tools, frameworks, and platforms I build with.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allSkills.map((skill, i) => (
              <div
                key={skill.name}
                className={`group relative rounded-xl flex flex-col items-center justify-center gap-3 py-7 px-4
                  bg-white/[0.02] border border-white/[0.05]
                  hover:bg-white/[0.05] hover:border-white/[0.10]
                  transition-all duration-300 cursor-pointer
                  ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-4"}`}
                style={{ animationDelay: `${(i % 12) * 50 + 100}ms` }}
              >
                <img
                  src={getIconSrc(skill)}
                  alt={skill.name}
                  className="w-10 h-10 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  draggable={false}
                />
                <span
                  className="font-[var(--font-display)] text-[11px] font-medium tracking-wide text-center leading-tight opacity-40 group-hover:opacity-90 transition-opacity duration-300 select-none"
                  style={{ color: "var(--foreground)" }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
