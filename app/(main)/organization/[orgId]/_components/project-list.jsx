import { db } from "@/lib/prisma";
import Link from "next/link";

export default async function ProjectList({ orgId }) {
  const projects = await db.project.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });

  if (!projects.length) {
    return (
      <p className="text-muted-foreground">No projects yet. Create one to get started.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={`/organization/${orgId}/project/${project.id}`}
            className="text-primary hover:underline"
            prefetch={false}
          >
            {project.name}
          </Link>
          {project.description && (
            <span className="ml-2 text-sm text-muted-foreground">
              — {project.description}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
