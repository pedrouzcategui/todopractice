'use client'
import { Button, Input, Textarea } from '@/components/ui';
import { Task, TaskStatus, User } from '@prisma/client';
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
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

type TaskEditionForm = {
    title: string,
    description: string,
    status: TaskStatus,
    dueDate: string | Date,
    asignee_id: string,
    workspaceId: string,
    createdById: string,
}

type TaskEditionFormProps = {
    users: User[],
    workspaceId: string,
    createdById: string,
    task: Task
}

export default function TaskEditionForm({ users, workspaceId, createdById, task }: TaskEditionFormProps) {

    const { toast } = useToast()
    const { mutate: createTask } = useCreateTask()

    const [taskForm, setTaskForm] = React.useState<TaskEditionForm>({
        title: task.title,
        description: task.status,
        status: "TODO",
        dueDate: task.dueDate ?? "",
        asignee_id: task.assigneeId ?? "",
        workspaceId: task.workspaceId,
        createdById: task.createdById,
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
        toast({
            title: "Task Created!",
            variant: "success"
        })
    }

    const handleAssigneeChange = (value: string) => {
        setTaskForm((prevForm) => ({
            ...prevForm,
            asignee_id: value
        }))
    }

    return (
        <div className='w-1/2 mx-auto'>
            <div className='my-4'>
                <Link className='flex gap-2 items-center text-xs text-gray-300' href={'/dashboard'}><ArrowLeftIcon size={25} />Go Back to Dashboard</Link>
            </div>
            <div className='bg-white p-5 rounded shadow'>
                <div className="grid grid-cols-2 mb-3">
                    <div className='flex items-center'>
                        <h1 className="font-bold text-2xl">Edit Task</h1>
                    </div>
                    <div className="flex">
                        <div className='flex-grow'>
                            <label className="block">Asignee</label>
                            <Select onValueChange={handleAssigneeChange} name='asignee'>
                                <SelectTrigger>
                                    <SelectValue placeholder={users[0].name} />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem className='p-0 py-2 px-8' key={user.id} value={user.id}>
                                            <div className='flex items-center gap-2'>
                                                <Image src={user.image ?? "/default-profile.png"} className='rounded-full' alt={user.name ?? "default user image"} width={25} height={25} />
                                                <div>
                                                    {user.name}
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="col-span-3">
                        <label htmlFor="title">Task Title</label>
                        <Input value={task.title} placeholder="Ex: Recruit Cyborg to the justice league" name='title' onChange={handleFormChange} />
                    </div>
                    <div>
                        <label htmlFor="dueDate">Due Date</label>
                        <Input type="date" name='dueDate' onChange={handleFormChange} />
                    </div>
                </div>
                <div>
                    <Textarea name='description' value={task.description} onChange={handleFormChange} />
                </div>
                <Button className="block ml-auto mt-4" onClick={handleSubmit}>Edit</Button>
            </div>
        </div>

    )
}