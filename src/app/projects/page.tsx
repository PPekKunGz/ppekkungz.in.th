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
        // console.log("processedData", processedData)
        // console.log("data", data)
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
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen text-primary p-6 md:p-8 lg:p-12 font-clash">
      <div className="space-y-6 mb-10">
        <div className="flex items-center gap-2 text-emerald-400" data-aos="fade-down" data-aos-duration="1500">
          <div className="w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L14.9282 4V12L8 16L1.07179 12V4L8 0Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-wider">MY WORK</span>
        </div>
        <h1 className="text-4xl md:text-3xl lg:text-5xl font-medium tracking-wide" data-aos="fade-left" data-aos-duration="2000">Product Design & Development</h1>
        <h1 className="text-xl font-medium tracking-wide" data-aos="fade-right" data-aos-duration="2500">@PPekKunGzDev</h1>
      </div>

      <div className="flex flex-wrap justify-end gap-4 mb-12" data-aos="fade-down" data-aos-duration="2500">
        {["All", "Website", "Minecraft"].map((filter) => (
          <Button key={filter} variant={activeFilter === filter ? "default" : "ghost"} onClick={() => setActiveFilter(filter)} className={`rounded-full ${activeFilter === filter ? "bg-zinc-800 hover:bg-primary text-white" : "text-zinc-400 hover:text-primary"}`}>
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8" data-aos="fade-down" data-aos-duration="2500">
        {filteredProjects.map((project) => (
          <Link href={project.url} className="group flex-col flex items-center" key={project.id} data-aos="fade-up" data-aos-delay={project.id * 50} target="_blank" rel="noopener noreferrer">

            <div className={"flex h-[13rem] w-[13rem] flex-col gap-4 lg:flex-row"}>
              <MagicCard className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl" gradientColor={theme === "dark" ? "#fff" : "#D9D9D955"}>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={200}
                  height={200}
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                />
              </MagicCard>
            </div>
            <div className="mt-6 space-y-1 w-[13rem]">
              <h3 className="text-xl font-semibold uppercase line-clamp-1">{project.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <p className="text-zinc-400 line-clamp-1">{project.description}</p>
                {/* <span className="text-zinc-500">{project.year} ?</span> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
