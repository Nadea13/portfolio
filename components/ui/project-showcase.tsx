"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

export interface ProjectItem {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const defaultProjects: ProjectItem[] = [
  {
    title: "League Flow",
    description: "Football tournament management platform with scheduling, live scores & payments.",
    year: "2025",
    link: "https://leagueflow.vercel.app",
    image: "/projects/leagueflow_logo.png",
  },
  {
    title: "ÊTRE",
    description: "Premium single-page E-commerce landing page with real-time shopping cart.",
    year: "2025",
    link: "https://etre-nine.vercel.app",
    image: "/projects/etre_logo.png",
  },
  {
    title: "QFlow",
    description: "Queue management system for restaurants and businesses.",
    year: "2026",
    link: "https://q-flow-omega.vercel.app",
    image: "/projects/qflow_logo.png",
  },
]

interface ProjectShowcaseProps {
  projects?: ProjectItem[]
  title?: string
  subtitle?: string
}

export function ProjectShowcase({
  projects = defaultProjects,
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [containerOrigin, setContainerOrigin] = useState({ left: 0, top: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerOrigin({ left: rect.left, top: rect.top })
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerOrigin({ left: rect.left, top: rect.top })
    }
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Floating interactive image preview */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl shadow-2xl border border-border/60 bg-card/80 backdrop-blur-md"
        style={{
          left: containerOrigin.left,
          top: containerOrigin.top,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 120}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[340px] h-[220px] bg-muted/40 rounded-2xl overflow-hidden flex items-center justify-center p-3">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target={project.link.startsWith("http") ? "_blank" : undefined}
            rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-8 md:py-10 border-t border-border/50 transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 md:-mx-6 px-4 md:px-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100 shadow-lg shadow-black/30" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-3">
                    <span className="text-sm md:text-base font-mono text-primary/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight">
                      <span className="relative">
                        {project.title}
                        {/* Animated underline */}
                        <span
                          className={`
                            absolute left-0 -bottom-1 h-[2px] bg-primary
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    {/* Arrow that slides in */}
                    <ArrowUpRight
                      className={`
                        w-6 h-6 text-primary
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-3 translate-y-3"
                        }
                      `}
                    />
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      text-muted-foreground text-base md:text-lg mt-3 leading-relaxed max-w-2xl
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/90" : "text-muted-foreground"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Year badge */}
                <span
                  className={`
                    text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-full bg-muted/60 text-muted-foreground tabular-nums border border-border/40
                    transition-all duration-300 ease-out shrink-0
                    ${hoveredIndex === index ? "text-primary border-primary/30 bg-primary/10" : ""}
                  `}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom border for last item */}
        <div className="border-t border-border/50" />
      </div>
    </div>
  )
}
