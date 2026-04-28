import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import {
  Shield,
  Eye,
  Car,
  Wind,
  ExternalLink,
} from "lucide-react";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const flagshipProject = {
  title: "KidSentry",
  subtitle: "Hybrid Edge-Cloud AI Solution",
  description:
    "A real-time hazard detection system designed for indoor environments to ensure child safety. Combines edge computing on Raspberry Pi with cloud-based ML inference for low-latency threat identification using computer vision and sensor fusion.",
  tags: [
    "YOLO",
    "TensorFlow",
    "Raspberry Pi",
    "OpenCV",
    "Edge AI",
    "Cloud",
    "Python",
    "IoT",
  ],
  icon: Shield,
  features: [
    "Real-time object/hazard detection via YOLO models",
    "Hybrid edge-cloud architecture for low-latency inference",
    "Sensor fusion with camera + environmental sensors",
    "Mobile alerting system for caregivers",
  ],
};

const secondaryProjects = [
  {
    title: "IoT Wireless Vehicle Control",
    description:
      "Wireless control system for legacy vehicles via mobile application using IoT microcontrollers and Bluetooth/WiFi bridges.",
    tags: ["IoT", "Embedded", "Mobile App", "Bluetooth"],
    icon: Car,
  },
  {
    title: "Industrial Stack Gas Analyzer",
    description:
      "Sugarcane mill gas monitoring with real-time sensor data acquisition, threshold alerting, and historical data logging.",
    tags: ["IoT", "Sensors", "Data Analysis", "Safety"],
    icon: Wind,
  },
  {
    title: "ALPR Detection System",
    description:
      "Automatic License Plate Recognition using YOLO object detection and PaddleOCR, Dockerized for deployment on edge devices and cloud.",
    tags: ["YOLO", "PaddleOCR", "Docker", "Computer Vision"],
    icon: Eye,
  },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="projects" className="relative w-full min-h-screen overflow-hidden bg-transparent" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto section-padding pointer-events-none">
        <div className="pointer-events-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
            }`}
        >
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Featured </span>
            <span style={{ color: "var(--primary)" }}>Projects</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ background: "var(--primary)" }} />
        </div>

        {/* Flagship Project */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="glass rounded-2xl p-8 md:p-10 border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Icon/Visual */}
              <div className="flex-shrink-0 flex items-start justify-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(168,85,247,0.15))",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  <flagshipProject.icon size={36} style={{ color: "var(--primary)" }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="default" className="text-xs uppercase tracking-wider">
                    Thesis Project
                  </Badge>
                </div>
                <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold tracking-wider mb-1" style={{ color: "var(--foreground)" }}>
                  {flagshipProject.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: "var(--secondary)" }}>
                  {flagshipProject.subtitle}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                  {flagshipProject.description}
                </p>

                {/* Features */}
                <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                  {flagshipProject.features.map((feature, i) => (
                    <li key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--muted-foreground)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--primary)" }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {flagshipProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <GithubIcon size={14} /> Source Code
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ExternalLink size={14} /> Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {secondaryProjects.map((project, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 glass-hover transition-all duration-500 group ${isInView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-6"
                }`}
              style={{ animationDelay: `${(i + 2) * 150}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "rgba(168,85,247,0.08)",
                  border: "1px solid rgba(168,85,247,0.15)",
                }}
              >
                <project.icon size={22} style={{ color: "var(--secondary)" }} />
              </div>
              <h4 className="font-[var(--font-display)] text-base font-semibold tracking-wide mb-2" style={{ color: "var(--foreground)" }}>
                {project.title}
              </h4>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
