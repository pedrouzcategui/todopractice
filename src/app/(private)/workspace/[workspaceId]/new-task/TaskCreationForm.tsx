'use client'
import { Button, Input, Textarea } from '@/components/ui';
import { TaskStatus, User } from '@prisma/client';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast';
import { useCreateTask } from '@/hooks/tasks';

type TaskCreationForm = {
    title: string,
    description: string,
    status: TaskStatus,
    dueDate: string | Date,
    asignee_id: string,
    workspaceId: string,
    createdById: string,
}

type TaskCreationFormProps = {
    users: User[],
    workspaceId: string,
    createdById: string
}

export default function TaskCreationForm({ users, workspaceId, createdById }: TaskCreationFormProps) {

    const { toast } = useToast()
    const { mutate: createTask } = useCreateTask()

    const [taskForm, setTaskForm] = React.useState<TaskCreationForm>({
        title: "",
        description: "",
        status: "TODO",
        dueDate: "",
        asignee_id: users[0].id,
        workspaceId,
        createdById,
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskForm((previousForm) => ({
            ...previousForm,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        for (const [key, value] of Object.entries(taskForm)) {
            if (!value) {
                toast({
                    title: `Empty Field: ${key}`,
                    variant: 'destructive',
                    description: `The field "${key}" cannot be empty`
                })
                return;
            }
        }
        createTask({
            title: taskForm.title,
            description: taskForm.description,
            status: 'TODO',
            dueDate: new Date(taskForm.dueDate),
            assignee: {
                connect: {
                    id: taskForm.asignee_id
                }
            },
            Workspace: {
                connect: {
                    id: workspaceId
                }
            },
            createdBy: {
                connect: {
                    id: createdById
                }
            }
        })
    }

    const handleAssigneeChange = (value: string) => {
        setTaskForm((prevForm) => ({
            ...prevForm,
            asignee_id: value
        }))
    }

    return (
        <>
            <div className="grid grid-cols-4 mb-3">
                <div className="col-span-3 flex items-center">
                    <h1 className="text-lg font-bold">Create Task</h1>
                </div>
                <div className="flex justify-end">
                    <div>
                        <label className="block">Asignee</label>
                        <Select onValueChange={handleAssigneeChange} name='asignee'>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={users[0].name} />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map(user => (
                                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="col-span-3 flex items-center">
                    <Input placeholder="Ex: Recruit Cyborg to the justice league" name='title' onChange={handleFormChange} />
                </div>
                <div className="flex justify-end">
                    <Input type="date" name='dueDate' onChange={handleFormChange} />
                </div>
            </div>
            <div>
                <Textarea name='description' onChange={handleFormChange} />
            </div>
            <Button className="block ml-auto mt-4" onClick={handleSubmit}>Create</Button>
        </>
    )
}