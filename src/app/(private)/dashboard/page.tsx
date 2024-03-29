"use client";

import { Task } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef } from "react";
import { ListView } from "@/components/dashboard/list-view";

// TODO: remove this mock data and replace it with real data from the backend
const MOCK_TASKS = [
  {
    id: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdAt: new Date(),
    dueDate: new Date(),
    deletedAt: null,
    description: "This is a task description",
    status: "TODO",
    title: "Task 1",
    workspaceId: "935ff71b-af36-4d25-adcf-465fd4d351e9",
    order: 1,
    assigneeId: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdById: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
  },
  {
    id: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdAt: new Date(),
    dueDate: new Date(),
    deletedAt: null,
    description: "This is a task description",
    status: "IN_PROGRESS",
    title: "Task 2",
    workspaceId: "935ff71b-af36-4d25-adcf-465fd4d351e9",
    order: 2,
    assigneeId: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdById: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
  },
  {
    id: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdAt: new Date(),
    dueDate: null,
    deletedAt: null,
    description: "This is a task description",
    status: "IN_PROGRESS",
    title: "Task 3",
    workspaceId: "935ff71b-af36-4d25-adcf-465fd4d351e9",
    order: 3,
    assigneeId: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
    createdById: "b22ae91b-7ad1-499b-9ff9-2aa8720c06ec",
  },
] satisfies Task[];

/**
 * Available view modes for the tasks display in dashboard.
 */
const VIEW_MODES = {
  KANBAN: "kanban",
  LIST: "list",
} as const;

type ViewMode = keyof typeof VIEW_MODES;

/**
 * Expected query parameters for `DashboardPage`.
 */
type SearchParams = {
  view: ViewMode;
};

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Partial<SearchParams>;
}) {
  const { view } = searchParams;
  const defaultViewMode = view ?? VIEW_MODES.KANBAN;

  // TODO: workspaces should be populated with users workspaces provided by backend
  const WORKSPACES = [
    {
      value: "wayne_industries",
      label: "Wayne Industries",
    },
    {
      value: "avengers",
      label: "Avengers",
    },
    {
      value: "jap_software",
      label: "JAP Software",
    },
  ];

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(function bindGlobalKeydown() {
    function focusSearchInput(event: KeyboardEvent) {
      if (event.ctrlKey && event.code === "KeyK") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearchInput);

    return () => window.addEventListener("keydown", focusSearchInput);
  }, []);

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <nav className="flex-grow-0">
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          <Select>
            <SelectTrigger className="w-full md:w-1/5 bg-white">
              <SelectValue placeholder="Workspace" />
            </SelectTrigger>

            <SelectContent>
              {WORKSPACES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* TODO: add event listener to focus search input on (Ctrl + K) keypress */}
          <Input
            className="bg-white"
            ref={searchInputRef}
            placeholder="Search for a task (Ctrl + K)"
          />
        </div>
      </nav>

      <section className="flex flex-col flex-grow h-full">
        {/* TODO: `defaultValue` should come from query parameters in order to provide the state of the current view */}
        <Tabs
          defaultValue={defaultViewMode}
          className="flex flex-col flex-grow"
        >
          <header className="flex flex-col gap-1 items-center flex-grow-0">
            <TabsList className="bg-white px-3 py-6 flex gap-4 w-full md:max-w-max shadow-sm">
              <TabsTrigger
                className="w-full md:w-[100px] data-[state=active]:bg-primary data-[state=active]:text-white"
                value={VIEW_MODES.KANBAN}
              >
                Kanban
              </TabsTrigger>
              <TabsTrigger
                className="w-full md:w-[100px] data-[state=active]:bg-primary data-[state=active]:text-white"
                value={VIEW_MODES.LIST}
              >
                List
              </TabsTrigger>
            </TabsList>
          </header>

          <div className="flex flex-grow">
            <TabsContent value={VIEW_MODES.KANBAN}>
              {/* TODO: should render Kanban visualization component */}
              <p>This is the kanban</p>
            </TabsContent>

            <TabsContent className="w-full" value={VIEW_MODES.LIST}>
              {/* TODO: should render List visualization component */}
              <ListView tasks={MOCK_TASKS} />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </section>
  );
}
