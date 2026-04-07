import { db } from "@/lib/prisma";

export default async function UserIssues({ userId }) {
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return <p className="text-muted-foreground">User not found.</p>;
  }

  const issues = await db.issue.findMany({
    where: {
      OR: [{ reporterId: user.id }, { assigneeId: user.id }],
    },
    include: { project: { select: { name: true, key: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  if (!issues.length) {
    return (
      <p className="text-muted-foreground">No issues assigned or reported by you.</p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your issues</h2>
      <ul className="space-y-2">
        {issues.map((issue) => (
          <li key={issue.id} className="flex items-center gap-2 text-sm">
            <span
              className="px-2 py-0.5 rounded text-xs font-medium bg-muted"
              title={issue.status}
            >
              {issue.status}
            </span>
            <span className="font-medium">{issue.title}</span>
            <span className="text-muted-foreground">
              — {issue.project.key}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
