import { Task, TaskStatus } from "@prisma/client"
import { TasksList } from "./tasks-list"

type ListViewProps = {
    tasks: Task[]
}

export function ListView({ tasks }: ListViewProps) {
    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

    return (
        <section>
            <div className="flex flex-col gap-10">
                {statuses.map(status => (
                    <TasksList 
                        key={status} 
                        tasks={tasks.filter(({ status: taskStatus }) => taskStatus === status)} 
                        status={status} 
                    />
                ))}
            </div>
        </section>
    )
}