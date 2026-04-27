import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ThermodynamicGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grid density. Lower = chunky, Higher = smooth.
   * Default: 25
   */
  resolution?: number;
  /**
   * Cooling rate (0 to 1). Higher = trails fade faster.
   * Default: 0.98
   */
  coolingFactor?: number;
}

const ThermodynamicGrid = ({
  className,
  resolution = 25,
  coolingFactor = 0.98,
  style,
  ...props
}: ThermodynamicGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // No transparency for perf
    if (!ctx) return;

    // Simulation State
    let grid: Float32Array; // Temperature map (0.0 - 1.0)
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    
    // Mouse State
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, active: false };

    const getThermalColor = (t: number) => {
      // Color Palette: #050505 -> #FF5F00 -> #FF8C00 -> #FFC300 -> #FFD400
      const stops = [
        { t: 0.0, r: 5, g: 5, b: 5 },
        { t: 0.25, r: 255, g: 95, b: 0 },
        { t: 0.5, r: 255, g: 140, b: 0 },
        { t: 0.75, r: 255, g: 195, b: 0 },
        { t: 1.0, r: 255, g: 212, b: 0 },
      ];
      
      if (t <= 0) return `rgb(${stops[0].r}, ${stops[0].g}, ${stops[0].b})`;
      if (t >= 1) return `rgb(${stops[4].r}, ${stops[4].g}, ${stops[4].b})`;
      
      for (let i = 0; i < stops.length - 1; i++) {
        if (t >= stops[i].t && t <= stops[i+1].t) {
          const range = stops[i+1].t - stops[i].t;
          const factor = (t - stops[i].t) / range;
          
          const r = Math.round(stops[i].r + factor * (stops[i+1].r - stops[i].r));
          const g = Math.round(stops[i].g + factor * (stops[i+1].g - stops[i].g));
          const b = Math.round(stops[i].b + factor * (stops[i+1].b - stops[i].b));
          
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
      return `rgb(255, 212, 0)`;
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-init grid
      cols = Math.ceil(width / resolution);
      rows = Math.ceil(height / resolution);
      grid = new Float32Array(cols * rows).fill(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // --- PHYSICS LOOP ---
    let animationId: number;
    const update = () => {
      // 1. INJECT HEAT (Brush)
      if (mouse.active) {
        // Bresenham-like line for fast mouse movement preventing gaps
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const steps = Math.ceil(dist / (resolution / 2)); // Sub-steps
        
        for (let s = 0; s <= steps; s++) {
            const t = steps > 0 ? s / steps : 0;
            const x = mouse.prevX + dx * t;
            const y = mouse.prevY + dy * t;
            
            const col = Math.floor(x / resolution);
            const row = Math.floor(y / resolution);
            
            // Brush Radius
            const radius = 2;
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    const c = col + i;
                    const r = row + j;
                    if (c >= 0 && c < cols && r >= 0 && r < rows) {
                        const idx = c + r * cols;
                        // Add heat (clamp to 1.0)
                        // Inverse square falloff
                        const d = Math.sqrt(i*i + j*j);
                        if (d <= radius) {
                            grid[idx] = Math.min(1.0, grid[idx] + 0.3 * (1 - d/radius));
                        }
                    }
                }
            }
        }
      }
      
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // 2. RENDER & DIFFUSE
      // We clear with a very dark color instead of transparent to support the "Additive" look
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = c + r * cols;
          const temp = grid[idx];

          // Cooling
          grid[idx] *= coolingFactor;
          
          // Diffusion (Simulate heat spreading to neighbors)
          if (temp > 0.01) {
             // Simplified diffusion for performance
          }

          // VISUALIZATION
          // Only draw if hot enough
          if (temp > 0.05) {
             const x = c * resolution;
             const y = r * resolution;
             
             ctx.fillStyle = getThermalColor(temp);
             
             // Draw "Cell"
             // Using rectangles is faster than circles
             const size = resolution * (0.8 + temp * 0.5); // Hotter = Bigger
             const offset = (resolution - size) / 2;
             
             ctx.beginPath();
             ctx.rect(x + offset, y + offset, size, size);
             ctx.fill();
          } else {
             // Draw subtle grid for cold areas (Structure)
             // Only draw every 2nd or 3rd to keep it clean
             if (c % 2 === 0 && r % 2 === 0) {
                 const x = c * resolution;
                 const y = r * resolution;
                 ctx.fillStyle = "#18181b"; // Zinc-900
                 ctx.fillRect(x + resolution/2 - 1, y + resolution/2 - 1, 2, 2);
             }
          }
        }
      }

      animationId = requestAnimationFrame(update);
    };

    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    resize();
    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resolution, coolingFactor]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden bg-[#050505]", className)}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ThermodynamicGrid;
