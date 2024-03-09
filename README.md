# Workspaces

Manage projects and invite collaborators to work together.

## Description

`Workspaces` is a web application that allows users to create and manage projects (workspaces). It's interactive and collaborative, allowing users to share and work on projects with a team of users.

## User Stories

- **Workspaces**
  - [] As a user, I want to be able to create a new workspace.
  - [] As a user, I want to be able to see all the workspaces I have created and I've been invited to.
  - [] As a user, I want to manage the workspaces I have created (edit, delete).
  - [] As a user, I want to be able to invite other users to my workspace.
- **Tasks**
  - [] As a user, I want to be able to create a new task in a workspace.
  - [] As a user, I want to be able to see all the tasks in a workspace.
  - [] As a user, I want to be able to manage the tasks in a workspace, this includes, adding a description, assigning a user, setting a due date, and marking a task as completed.
- **Collaboration**
  - [] As a user, I want to be able to invite other users to my workspace.
  - [] As a user, I want to be able to see all the users in a workspace.
  - [] As a user, I want to be able to remove a user from a workspace.

## Contribution

This is a **Next.js 14** project. It uses Prisma for the database and authentication is handled by NextAuth. To contribute or run this project locally, follow these steps:

1. Clone the repository.

```bash
git clone git@github.com:pedrouzcategui/todopractice.git
```

2. Install the dependencies.

```bash
cd todopractice
npm install
```

3. Create a `.env` file in the root of the project and add the following environment variables. We use Discord, Google, and GitHub for authentication. You will need to create an application in the respective developer portal and get the credentials.

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/workspaces"

# NextAuth Vars
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# Auth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

4. Run the development server.

```bash
npm run dev
```
