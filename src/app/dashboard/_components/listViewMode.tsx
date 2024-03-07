
import { LucidePlus as PlusIcon } from "lucide-react" 
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/dates"

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
        color: "#ef4444"
    },
    IN_PROGRESS: {
        label: "In progress",
        color: "#0ea5e9",
    },
    DONE: {
        label: "Done",
        color: "#10b981"
    }
}

function TasksTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-2/12">Title</TableHead>
                    <TableHead className="w-4/12">Description</TableHead>
                    <TableHead className="w-2/12">Assignee</TableHead>
                    <TableHead className="w-2/12">Due date</TableHead>
                    <TableHead className="w-2/12">Date created</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell className="py-1">Lorem ipsum</TableCell>
                    <TableCell className="py-1">Lorem ipsum sit amet y otras cosas mas extensas!</TableCell>
                    <TableCell className="py-1">
                        <Avatar>
                            <AvatarImage src="https://www.clipartmax.com/png/middle/105-1055054_view-golang-think-logo-golang.png"/>
                            <AvatarFallback>GO</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell className="py-1">{formatDate(new Date())}</TableCell>
                    <TableCell className="py-1">{formatDate(new Date())}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

function TasksList({ status }: TaskListProps) {
    const { color, label } = badgeByStatus[status]

    return (
        <section className="flex flex-col gap-4">
            <header className="flex gap-4">
                <Badge variant="default" style={{ backgroundColor: color }} className="gap-2 rounded-sm justify-center uppercase w-min-[80px]">
                    <span className="inline-block w-2 h-2 rounded-full bg-white" />
                    <span>{label}</span>
                </Badge>

                <Badge variant="outline" className="rounded-full">
                    <span>1</span>
                </Badge>

                <Button variant="outline" className="h-6 px-3 flex items-center gap-2 text-xs">
                    <PlusIcon size={12} />
                    <span>Add task</span>
                </Button>
            </header>

            <TasksTable />
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