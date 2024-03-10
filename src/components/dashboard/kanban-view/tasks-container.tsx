import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./sortable-item";
import { Task } from "@prisma/client";
import { Badge } from "@/components/ui/badge";


type TasksContainerProps = {
    id: string;
    label: string;
    color: string;
    tasks: Task[];
}

export default function Container({ id, label, color, tasks }: TasksContainerProps) {

    const { setNodeRef } = useDroppable({
        id,
        data: {
            type: "COLUMN"
        }
    });

    return (
        <SortableContext
            id={id}
            items={tasks}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} className="flex-1">
                <Badge variant="default" style={{ backgroundColor: color }} className="gap-2 mb-2 rounded-sm justify-center uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-white" />
                    <span>{label}</span>
                </Badge>
                {tasks.map(({ id, title }) => (
                    <SortableItem key={id} id={id} taskTitle={title} />
                ))}
            </div>
        </SortableContext>
    );
}
