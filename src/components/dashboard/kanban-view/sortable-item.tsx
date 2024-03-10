import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
    title: string;
}

export function TaskCard({ title }: TaskCardProps) {
    return <div className="p-2 bg-white mb-2 rounded shadow-md">{title}</div>;
}

export function TaskCardOverlay() {
    return (
        <div className="p-2 h-[50px] bg-slate-300 mb-2 rounded shadow-md"></div>
    )
}

type SortableItemProps = {
    id: string;
    taskTitle: string;
}

export default function SortableItem({ id, taskTitle }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id, data: { type: "TASK", taskTitle } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    if (isDragging) {
        return <TaskCardOverlay />
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard title={taskTitle} />
        </div>
    );
}
