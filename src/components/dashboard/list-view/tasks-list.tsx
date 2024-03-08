import { LucidePlus as PlusIcon } from "lucide-react" 
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Task, TaskStatus } from "@prisma/client"
import { TasksTable } from "./tasks-table"

type TaskBadgeProps = {
    color: string
    label: string
}

const badgeByStatus: Record<TaskStatus, TaskBadgeProps> = {
    TODO: {
        label: "To do",
        color: "#ef4444" // red-500
    },
    IN_PROGRESS: {
        label: "In progress",
        color: "#3b82f6", // blue-500
    },
    DONE: {
        label: "Done",
        color: "#10b981" // emerald-500
    }
}

type ListInfoPanelProps = {
    tasksAmount: number
    status: TaskStatus
}

function ListInfoPanel({ status, tasksAmount }: ListInfoPanelProps) {
    const { color, label } = badgeByStatus[status]

    return (
            <header className="flex gap-4">
                <Badge variant="default" style={{ backgroundColor: color }} className="gap-2 rounded-sm justify-center uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-white" />
                    <span>{label}</span>
                </Badge>

                <Badge variant="outline" className="rounded-full">
                    <span>{tasksAmount}</span>
                </Badge>

                <Button variant="outline" className="h-6 px-3 flex items-center gap-2 text-xs">
                    <PlusIcon size={12} />
                    <span>Add task</span>
                </Button>
            </header>
    )
}

type TaskListProps = {
    status: TaskStatus
    tasks: Task[]
}

export function TasksList({ tasks, status }: TaskListProps) {
    return (
        <section className="flex flex-col gap-4">
            <ListInfoPanel tasksAmount={tasks.length} status={status} />
            <TasksTable tasks={tasks} />
        </section>
    )
}