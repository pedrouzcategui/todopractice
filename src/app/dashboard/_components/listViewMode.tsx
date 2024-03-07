
import { LucidePlus as PlusIcon } from "lucide-react" 
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// TODO: `status` property should come from `TaskStatus` enum exported from database types
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

type TaskListProps = {
    status: TaskStatus
}

type TaskBadgeProps = {
    color: string
    label: string
}

const badgeByStatus: Record<TaskStatus, TaskBadgeProps> = {
    TODO: {
        label: "To do",
        color: "#FFD700"
    },
    IN_PROGRESS: {
        label: "In progress",
        color: "#FFA500",
    },
    DONE: {
        label: "Done",
        color: "#32CD32"
    }
}

function TasksList({ status }: TaskListProps) {
    const { color, label } = badgeByStatus[status]

    return (
        <section>
            <header className="flex gap-4">
                <Badge variant="default" style={{ backgroundColor: color }} className="rounded-sm justify-center uppercase w-min-[80px]">
                    {label}
                </Badge>

                <Badge variant="outline" className="rounded-full">
                    1
                </Badge>

                <Button variant="outline" size="sm" className="h-6 flex items-center gap-2 text-xs">
                    <PlusIcon size={12} />
                    <span>Add task</span>
                </Button>
            </header>
        </section>
    )
} 

export function ListViewMode() {
    return (
        <section>
            <div className="flex flex-col gap-6">
                <TasksList status="TODO" />
                <TasksList status="IN_PROGRESS" />
                <TasksList status="DONE" />
            </div>
        </section>
    )
}