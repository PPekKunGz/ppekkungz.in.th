import type { IProject } from "@/types/interface"

export default async function fetchProject(): Promise<IProject[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
  const data = await response.json()

  // Parse the JSON string technologies into an array
  return data.map((project: any) => ({
    ...project,
    technologies: JSON.parse(project.technologies || "[]"),
  }))
}