import { prisma } from "@/lib/db";

// This is a test page to check if the database connection is working and to see the users in the database. It is not meant to be used in production and should be removed before deployment.
export default async function TestDB() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}