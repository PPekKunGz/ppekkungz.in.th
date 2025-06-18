"use client"
import { useEffect, useState } from 'react';
import fetchProject from '@/service/fetchProject';
import { IProject } from '@/types/interface';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MagicCard } from '@/components/magicui/magic-card';
import { useTheme } from 'next-themes';

export default function Page() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProject()
        const processedData = data.map((project) => ({
          ...project,
          technologies: Array.isArray(project.technologies)
            ? project.technologies
            : JSON.parse(project.technologies || "[]"),
        }))
        setProjects(processedData)
      } catch (error) {
        console.error("Error fetching project data:", error)
        setError("Failed to fetch project data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.technologies?.includes(activeFilter),
  )

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-lg">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen text-primary p-6 md:p-8 lg:p-12 font-clash">
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-2 text-emerald-400" data-aos="fade-down" data-aos-duration="1500">
          <div className="w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L14.9282 4V12L8 16L1.07179 12V4L8 0Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-wider">MY WORK</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide" data-aos="fade-left" data-aos-duration="2000">
          Product Design & Development
        </h1>
        <h2 className="text-xl font-medium tracking-wide text-slate-400" data-aos="fade-right" data-aos-duration="2500">
          @PPekKunGzDev
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-down" data-aos-duration="2500">
        {["All", "Website", "Minecraft"].map((filter) => (
          <Button 
            key={filter} 
            variant={activeFilter === filter ? "default" : "ghost"} 
            onClick={() => setActiveFilter(filter)} 
            className={`rounded-full transition-all duration-300 ${
              activeFilter === filter 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8" data-aos="fade-down" data-aos-duration="2500">
        {filteredProjects.map((project, index) => (
          <Link 
            href={project.url} 
            className="group flex-col flex items-center" 
            key={project.id} 
            data-aos="fade-up" 
            data-aos-delay={index * 50} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="flex h-[13rem] w-[13rem] flex-col gap-4 lg:flex-row">
              <MagicCard 
                className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl overflow-hidden group-hover:scale-[1.02] transition-all duration-300" 
                gradientColor={theme === "dark" ? "#fff" : "#D9D9D955"}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="object-cover w-[200px] h-[200px] rounded-lg transition-all duration-300 group-hover:brightness-110"
                  />
                  
                  {/* Simple hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-black text-sm font-medium">
                      View Project
                    </div>
                  </div>
                </div>
              </MagicCard>
            </div>
            
            <div className="mt-6 space-y-2 w-[13rem]">
              <h3 className="text-xl font-semibold uppercase line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <p className="text-zinc-400 line-clamp-1">{project.description}</p>
                {project.year && (
                  <span className="text-zinc-500 text-xs">{project.year}</span>
                )}
              </div>
              
              {/* Technology tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies?.slice(0, 2).map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-400 text-lg">No projects found for "{activeFilter}"</p>
        </div>
      )}
    </div>
  );
}