import { prisma } from "@/lib/db";

export default async function TestDB() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}