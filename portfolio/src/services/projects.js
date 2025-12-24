import {ENDPOINTS} from "./apiEndpoints"

export async function getProjects() {
  const res = await fetch(ENDPOINTS.GET_PROJECTS);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();

  return data.map((project) => ({
    projectid: project.projectid,
    name: project.name,
    description: project.description,
    techStack: project.techstack || [],
    githublink: project.githublink?.startsWith("http")
      ? project.githublink
      : `${project.githublink}`,
    deploylink: project.deploylink?.startsWith("http")
      ? project.deploylink
      : `${project.deploylink}`,
    image:
      project.image ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  }));
}