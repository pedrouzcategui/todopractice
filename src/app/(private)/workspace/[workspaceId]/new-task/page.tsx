
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
        <div className="w-4/5 p-4 bg-white mx-auto">
            <TaskCreationForm workspaceId={workspaceId} users={users} createdById={user.id} />
        </div>
    );
}

