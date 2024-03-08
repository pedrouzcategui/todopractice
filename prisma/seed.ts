import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.user.create({
    data: {
      email: "dummy@user.com",
      name: "Dummy",
      workspaces: {
        create: [
          {
            isAdmin: true,
            workspace: {
              create: {
                title: "Dummy Workspace 1",
                description: "This is a dummy workspace 1",
              },
            },
          },
          {
            isAdmin: true,
            workspace: {
              create: {
                title: "Dummy Workspace 2",
                description: "This is a dummy workspace 2",
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
