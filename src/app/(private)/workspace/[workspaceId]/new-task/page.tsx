
import { findUsersByWorkspaceId } from "@/lib/workspaces.server";
import TaskCreationForm from "./TaskCreationForm";
import { getSession } from "@/lib/user";

export default async function TaskCreationPage({ params }: { params: { workspaceId: string } }) {
    const workspaceId = params.workspaceId;
    const users = await findUsersByWorkspaceId(workspaceId);
    const session = await getSession();
    const { user } = session ?? {};

    if (!user?.id) return null;

    return (
        <div className="p-4 h-screen flex flex-col justify-center">
            <TaskCreationForm workspaceId={workspaceId} users={users} createdById={user.id} />
        </div>
    );
}

