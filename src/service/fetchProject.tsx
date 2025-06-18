import type { IProject } from "@/types/interface"
import { projects } from "@/lib/project"

export default async function fetchProject(): Promise<IProject[]> {
  return projects as unknown as IProject[]
}