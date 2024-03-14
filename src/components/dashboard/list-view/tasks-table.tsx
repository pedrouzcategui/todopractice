import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/lib/dates";
import { Task } from "@prisma/client";

type TaskRowProps = {
  task: Task;
};

function TaskRow({ task }: TaskRowProps) {
  const { title, description, createdAt, dueDate } = task;
  const formattedDueDate = dueDate ? formatDate(dueDate) : "-";
  const formattedCreatedAt = formatDate(createdAt);

  return (
    <TableRow>
      <TableCell className="py-1">{title}</TableCell>
      <TableCell className="py-1">{description}</TableCell>

      {/* TODO: should populate asignee with assigned user */}
      {/* TODO: maybe handle empty state for assignee (?) */}
      <TableCell className="py-1">
        <Avatar>
          <AvatarImage src="https://www.clipartmax.com/png/middle/105-1055054_view-golang-think-logo-golang.png" />
          <AvatarFallback>GO</AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell className="py-1">{formattedDueDate}</TableCell>
      <TableCell className="py-1">{formattedCreatedAt}</TableCell>
    </TableRow>
  );
}

type EmptyTaskRowProps = {
  colSpan: number;
};

function EmptyTasksRow({ colSpan }: EmptyTaskRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="text-muted-foreground">
          There is none task created for this status yet
        </div>
      </TableCell>
    </TableRow>
  );
}

type TasksTableProps = {
  tasks: Task[];
};

export function TasksTable({ tasks }: TasksTableProps) {
  const TABLE_HEADERS = [
    { label: "Title", width: "w-2/12" },
    { label: "Description", width: "w-4/12" },
    { label: "Assignee", width: "w-2/12" },
    { label: "Due date", width: "w-2/12" },
    { label: "Date created", width: "w-2/12" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map(({ label, width }) => (
            <TableHead key={label} className={width}>
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks.length ? (
          tasks.map((task) => <TaskRow key={task.id} task={task} />)
        ) : (
          <EmptyTasksRow colSpan={TABLE_HEADERS.length} />
        )}
      </TableBody>
    </Table>
  );
}
