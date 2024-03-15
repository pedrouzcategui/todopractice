import { getTaskById } from "@/lib/tasks.server";
import TaskEditionForm from "../TaskEditionForm";
import { findUsersByWorkspaceId } from "@/lib/workspaces.server";
import { getSession } from "@/lib/user";

export default async function EditTaskPage({ params }: { params: { workspaceId: string, taskId: string } }) {
    const { taskId, workspaceId } = params
    const task = await getTaskById(taskId);
    const users = await findUsersByWorkspaceId(workspaceId);
    const session = await getSession();
    const { user } = session ?? {};

    if (!task || !user?.id) {
        return null
    }

    return (
        <div className="p-4 h-screen flex flex-col justify-center">
            <TaskEditionForm task={task} users={users} workspaceId={workspaceId} createdById={user.id} />
        </div>
    );
}