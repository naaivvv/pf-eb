import { useInView } from "@/hooks/use-in-view";
import antigravityIcon from "@/assets/icons/antigravity.svg";
import lovableIcon from "@/assets/icons/lovable.svg";
import powerbiIcon from "@/assets/icons/powerbi.svg";

interface SkillsSectionProps {
  isDark: boolean;
}

// --- SKILL DATA ---
// `cdn` = Simple Icons slug (fetched from CDN)
// `local` = path to imported asset (for brands not on Simple Icons)
// `color` = official brand hex color for the icon
type Skill = {
  name: string;
  color: string;
} & ({ cdn: string; local?: never } | { local: string; cdn?: never });

const allSkills: Skill[] = [
  { name: "Antigravity", local: antigravityIcon, color: "#4285F4" },
  { name: "Arduino", cdn: "arduino", color: "#00878F" },
  { name: "C++", cdn: "cplusplus", color: "#00599C" },
  { name: "Claude Code", cdn: "claude", color: "#D97757" },
  { name: "CrewAI", cdn: "crewai", color: "#FF4A00" },
  { name: "Docker", cdn: "docker", color: "#2496ED" },
  { name: "ElevenLabs", cdn: "elevenlabs", color: "#FFFFFF" },
  { name: "ESP32", cdn: "espressif", color: "#E7352C" },
  { name: "Figma", cdn: "figma", color: "#F24E1E" },
  { name: "Firebase", cdn: "firebase", color: "#DD2C00" },
  { name: "Flutter", cdn: "flutter", color: "#02569B" },
  { name: "Git", cdn: "git", color: "#F05032" },
  { name: "GitHub", cdn: "github", color: "#FFFFFF" },
  { name: "Google Stitch", cdn: "google", color: "#4285F4" },
  { name: "LangChain", cdn: "langchain", color: "#FFFFFF" },
  { name: "Laravel", cdn: "laravel", color: "#FF2D20" },
  { name: "Linux", cdn: "linux", color: "#FCC624" },
  { name: "Lovable", local: lovableIcon, color: "#FF5757" },
  { name: "MySQL", cdn: "mysql", color: "#4479A1" },
  { name: "N8n", cdn: "n8n", color: "#EA4B71" },
  { name: "Next.js", cdn: "nextdotjs", color: "#FFFFFF" },
  { name: "Node.js", cdn: "nodedotjs", color: "#5FA04E" },
  { name: "OpenCV", cdn: "opencv", color: "#5C3EE8" },
  { name: "PHP", cdn: "php", color: "#777BB4" },
  { name: "Power BI", local: powerbiIcon, color: "#F2C811" },
  { name: "Python", cdn: "python", color: "#3776AB" },
  { name: "PyTorch", cdn: "pytorch", color: "#EE4C2C" },
  { name: "Raspberry Pi", cdn: "raspberrypi", color: "#A22846" },
  { name: "React", cdn: "react", color: "#61DAFB" },
  { name: "Render", cdn: "render", color: "#FFFFFF" },
  { name: "Shopify", cdn: "shopify", color: "#7AB55C" },
  { name: "Supabase", cdn: "supabase", color: "#3FCF8E" },
  { name: "Tailwind CSS", cdn: "tailwindcss", color: "#06B6D4" },
  { name: "TensorFlow", cdn: "tensorflow", color: "#FF6F00" },
  { name: "TypeScript", cdn: "typescript", color: "#3178C6" },
  { name: "Vercel", cdn: "vercel", color: "#FFFFFF" },
  { name: "Vite", cdn: "vite", color: "#646CFF" },
];

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

function getIconSrc(skill: Skill, isDark: boolean): string {
  if (skill.local) return skill.local;
  // For white icons in light mode, use a dark color instead
  const color = (!isDark && skill.color === "#FFFFFF") ? "333333" : skill.color.replace("#", "");
  return `${SIMPLE_ICONS_CDN}/${skill.cdn}/${color}`;
}

export default function SkillsSection({ isDark }: SkillsSectionProps) {
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
                  border
                  transition-all duration-300 cursor-pointer
                  ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-4"}`}
                style={{
                  animationDelay: `${(i % 12) * 50 + 100}ms`,
                  background: "var(--surface-subtle)",
                  borderColor: "var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface-subtle-hover)";
                  e.currentTarget.style.borderColor = "var(--border-subtle-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface-subtle)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <img
                  src={getIconSrc(skill, isDark)}
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
