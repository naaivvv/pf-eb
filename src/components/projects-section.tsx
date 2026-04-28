import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- PROJECT DATA ---
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  category: string;
  year: string;
  image: string;
};

const projects: Project[] = [
  {
    id: "kidsentry",
    title: "KidSentry",
    subtitle: "Hybrid Edge-Cloud AI for Child Safety",
    description: "Thesis project architecting a real-time hazard detection system for indoor child environments. Combines edge computing with cloud AI pipelines using YOLO object detection, TensorFlow models, and OpenCV — all running on embedded hardware to minimize latency for safety-critical alerts.",
    techStack: ["Python", "YOLO", "TensorFlow", "OpenCV", "Raspberry Pi", "Edge AI"],
    category: "AI / ML",
    year: "2026",
    image: "/project-images/kidsentry.png",
  },
  {
    id: "brightedge",
    title: "BrightEdge",
    subtitle: "Advanced Eye Disease Pre-Diagnosis System",
    description: "A research project focusing on the development of a computer vision-based system for the pre-diagnosis of eye diseases using fundus images. It leverages deep learning (EfficientNetV2-S architecture) to detect Cataract, Diabetic Retinopathy (DR), and Glaucoma with clinical precision, while ensuring secure, HIPAA-compliant data handling.",
    techStack: ["Computer Vision", "Deep Learning", "EfficientNetV2-S", "Python", "Healthcare AI"],
    category: "AI / ML",
    year: "2026",
    image: "/project-images/brightedge.png",
  },
  {
    id: "snaid",
    title: "SNAID",
    subtitle: "Snake Identification AI System",
    description: "An embedded AI pipeline utilizing a Raspberry Pi 5 to process real-time imagery for deployment in Negros Occidental. Features a highly optimized 2-stage architecture leveraging YOLO for rapid object detection and MobileNet for precise species classification. Interface powered by a React desktop application with a robust Python backend.",
    techStack: ["YOLO", "MobileNet", "Python", "React", "Raspberry Pi"],
    category: "AI / Embedded",
    year: "2026",
    image: "/project-images/snaid.png",
  },
  {
    id: "iot-vehicle",
    title: "IoT Vehicle Control",
    subtitle: "Wireless Legacy Vehicle Modernization",
    description: "Designed an IoT-based wireless control system that retrofits legacy vehicles with mobile app control. Engineered custom PCB boards, integrated embedded microcontrollers, and built a real-time communication layer between hardware and a mobile application.",
    techStack: ["IoT", "PCB Design", "Embedded C", "Mobile App", "Wireless Protocols"],
    category: "IoT / Hardware",
    year: "2025",
    image: "/project-images/technodrive.jpg",
  },
  {
    id: "sugarcane-monitor",
    title: "Industrial Stack Gas Analyzer",
    subtitle: "Sugar Mill Monitoring System",
    description: "Architected a real-time gas monitoring system for sugarcane mills using distributed IoT sensors. The system provides continuous environmental monitoring, automated alerts for hazardous gas levels, and a centralized dashboard for mill operators.",
    techStack: ["IoT Sensors", "Embedded Systems", "Real-time Data", "Alert Systems"],
    category: "IoT / Hardware",
    year: "2025",
    image: "/project-images/isga.jpg",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis Pipeline",
    subtitle: "NLP Classification Engine",
    description: "An end-to-end natural language processing model leveraging Word2Vec (Google News embeddings) and TensorFlow for accurate sentiment classification. The application is containerized with Docker, deployed on HuggingFace, and exposed via a Flask backend running through ngrok for real-time web access.",
    techStack: ["NLP", "Word2Vec", "TensorFlow", "Docker", "Flask"],
    category: "AI / ML",
    year: "2025",
    image: "/project-images/sentiment.png",
  },
  {
    id: "light-pollution",
    title: "Light Intensity & Pollution Predictor",
    subtitle: "Environmental Deep Learning Model",
    description: "A deep learning regression model engineered to analyze environmental monitoring datasets. It accurately predicts light intensity (Is) and regional pollution levels, providing a scalable solution for ecological data tracking and analysis.",
    techStack: ["Deep Learning", "Python", "TensorFlow"],
    category: "AI / ML",
    year: "2025",
    image: "/project-images/light.png",
  },
  {
    id: "brain-tumor",
    title: "Brain Tumor MRI Classification",
    subtitle: "Medical Imaging Diagnostics",
    description: "A deep learning diagnostic tool built to analyze medical imaging. Engineered to classify MRI scans with high accuracy, assisting in rapid and reliable pre-diagnosis workflows for medical professionals.",
    techStack: ["Computer Vision", "Deep Learning", "TensorFlow", "Python"],
    category: "AI / Computer Vision",
    year: "2025",
    image: "/project-images/brain.png",
  },
  {
    id: "smart-outlet",
    title: "Smart 4-Gang Outlet System",
    subtitle: "IoT Hardware Integration",
    description: "A custom hardware-software integration utilizing a PIC18F4550 microcontroller and an ESP32 for Wi-Fi capabilities. Features real-time temperature monitoring and an integrated LCD interface for local control alongside remote IoT management.",
    techStack: ["IoT", "Hardware", "PIC18F4550", "ESP32", "C++"],
    category: "IoT / Hardware",
    year: "2024",
    image: "/project-images/4gos.png",
  },
  {
    id: "yieldwerx",
    title: "yieldWerx Analytics",
    subtitle: "Semiconductor Data Intelligence",
    description: "Built data-driven software solutions at yieldWerx Semiconductor to improve operational reporting accuracy. Optimized complex SQL queries to reduce latency, developed analytical dashboards, and ensured data integrity across large-scale semiconductor datasets.",
    techStack: ["SQL", "Python", "Data Analysis", "ETL", "Power BI"],
    category: "Data Engineering",
    year: "2024",
    image: "/project-images/yieldwerx.png",
  },
  {
    id: "chmsu-cier",
    title: "CHMSU CIER Management System",
    subtitle: "Institutional Admin Platform",
    description: "A comprehensive administrative platform built for the Carlos Hilado Memorial State University Center for Internationalization and External Relations. Engineered for dynamic, real-time institutional data handling and record management.",
    techStack: ["Laravel", "Livewire", "PHP", "Full-Stack"],
    category: "Web Development",
    year: "2024",
    image: "/project-images/ciermis.png",
  },
  {
    id: "wiredesk",
    title: "WireDesk CRM",
    subtitle: "Customer Relationship Management",
    description: "A dedicated customer relationship management solution for a business specializing in laptop wireless accessories. Features a fast, responsive dashboard tailored for tracking customer care tickets and service solutions.",
    techStack: ["Laravel", "Vite", "PHP"],
    category: "Web Development",
    year: "2024",
    image: "/project-images/wiredesk.jpeg",
  },
  {
    id: "acrosys",
    title: "ACROSYS",
    subtitle: "Attendee and Crowd Syncing System",
    description: "An event management application designed to handle large-scale crowd tracking and attendee synchronization in real-time, ensuring seamless event operations and data consistency.",
    techStack: ["Laravel", "Livewire", "PHP"],
    category: "Web Development",
    year: "2023",
    image: "/project-images/acrosys.png",
  },
  {
    id: "happy-teeth",
    title: "Happy-Teeth Dental Clinic",
    subtitle: "Clinic Management System",
    description: "A foundational web-based clinic management system featuring patient scheduling, secure record keeping, and administrative dashboards engineered for cross-browser reliability.",
    techStack: ["PHP", "Bootstrap", "MySQL"],
    category: "Web Development",
    year: "2023",
    image: "/project-images/happy.png",
  },
];

// --- CARD WIDTH CONFIG ---
const CARD_W = 380; // px per card
const GAP = 20; // px gap between cards

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the tall outer container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Total width the row needs to travel
  // (total row width minus one viewport width)
  const totalRowWidth = projects.length * (CARD_W + GAP) - GAP;
  // We'll compute the actual translate in the motion style using a CSS calc
  // so it adapts to viewport width at runtime.

  // Map 0-1 scroll progress → 0 to -(totalRowWidth - 100vw)
  // We overshoot slightly: at progress=1 the last card is fully visible.
  // Using a pixel estimate for the max translation:
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalRowWidth - window.innerWidth + 80)] // 80px padding buffer
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-transparent"
      // The tall container gives vertical scroll room to drive the horizontal animation
      style={{ height: `${Math.max(300, Math.ceil(projects.length / 3) * 100)}vh` }}
    >
      {/* Sticky viewport — pins while user scrolls through the tall section */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pointer-events-none">

        {/* Header — stays centered and visible */}
        <div className="relative z-10 pt-20 pb-8 px-6 text-center pointer-events-auto">
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-wider mb-4">
            <span style={{ color: "var(--foreground)" }}>Featured </span>
            <span style={{ color: "var(--primary)" }}>Projects</span>
          </h2>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: "var(--primary)" }} />
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            A curated selection of my work spanning AI, IoT, web development, and data engineering.
          </p>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-5 pl-10 pr-[40vw]"
            style={{ x }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="pointer-events-auto group flex-shrink-0 glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[var(--primary)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)]"
                style={{ width: `${CARD_W}px` }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Year badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md"
                      style={{ background: "rgba(5,5,5,0.7)", color: "var(--primary)", border: "1px solid rgba(249,115,22,0.2)" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md"
                      style={{ background: "rgba(5,5,5,0.7)", color: "var(--muted-foreground)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-[var(--font-display)] text-base font-bold tracking-wide mb-0.5 group-hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ color: "var(--foreground)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: "var(--secondary)" }}>
                    {project.subtitle}
                  </p>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--muted-foreground)" }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
