'use client'
import React, { useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    UniqueIdentifier
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import TasksContainer from "./tasks-container";
import { TaskCard } from "./sortable-item";
import { Task } from "@prisma/client";

type KanbanViewProps = {
    tasks: Task[]
}

export default function KanbanView({ tasks }: KanbanViewProps) {
    const [kanbanTasks, setKanbanTasks] = useState<Task[]>(tasks);
    const [activeTask, setActiveTask] = useState<{ id: UniqueIdentifier, taskTitle: string } | null>(null);

    const statuses = [
        {
            id: 'TODO',
            label: 'To Do',
            color: "#ef4444" // red-500
        },
        {
            id: 'IN_PROGRESS',
            label: 'In Progress',
            color: "#3b82f6", // blue-500
        },
        {
            id: 'DONE',
            label: 'Done',
            color: "#10b981" // emerald-500
        },
    ]

    // These are not necessary for web, but more for mobile and tablets.
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <div className="flex flex-row gap-4">
            <DndContext
                id="KANBAN_VIEW"
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {
                    statuses.map((status) => (
                        <TasksContainer key={status.id} tasks={kanbanTasks.filter(task => task.status === status.id)} {...status} />
                    ))
                }
                <DragOverlay>{activeTask ? <TaskCard title={activeTask.taskTitle} /> : null}</DragOverlay>
            </DndContext>
        </div>
    );

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const title = active.data.current?.taskTitle;
        setActiveTask({
            id: id,
            taskTitle: title
        });
    }

    function handleDragOver(event: any) {
        const { active, over } = event;
        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "TASK";
        const isOverATask = over.data.current?.type === "TASK";

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setKanbanTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);
                if (tasks[activeIndex].status != tasks[overIndex].status) {
                    tasks[activeIndex].status = tasks[overIndex].status;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }
                return arrayMove(tasks, activeIndex, overIndex);
            })
        }

        const isOverAColumn = over.data.current?.type === "COLUMN";

        if (isActiveATask && isOverAColumn) {
            setKanbanTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                tasks[activeIndex].status = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function handleDragEnd(event: any) {
        setActiveTask(null);
    }
}
