import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Available view modes for the tasks display in dashboard.
 */
const VIEW_MODES = {
    KANBAN: "kanban",
    LIST: "list"
} as const

type ViewMode = keyof typeof VIEW_MODES

/**
 * Expected query parameters for `DashboardPage`.
 */
type SearchParams = {
    view: ViewMode
}

export default function DashboardPage({ searchParams }: { searchParams: Partial<SearchParams> } ) {
    const { view } = searchParams
    const defaultViewMode = view ?? VIEW_MODES.KANBAN

    // TODO: workspaces should be populated with users workspaces provided by backend
    const WORKSPACES = [
        {
            value: "wayne_industries",
            label: "Wayne Industries"
        },
        {
            value: "avengers",
            label: "Avengers"
        },
        {
            value: "jap_software",
            label: "JAP Software"
        },
    ]

    return (
        <main className="min-h-screen p-4 flex flex-col gap-4 md:gap-6 md:p-10">
            <nav className="flex-grow-0">
                <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                    <Select>
                        <SelectTrigger className="w-full md:w-1/5">
                            <SelectValue placeholder="Workspace" />
                        </SelectTrigger>

                        <SelectContent>
                            {WORKSPACES.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem> 
                            ))}
                        </SelectContent>
                    </Select> 

                    {/* TODO: add event listener to focus search input on (Ctrl + K) keypress */}
                    <Input placeholder="Search for a task (Ctrl + K)" />

                    <Avatar className="rounded-md hidden md:block">
                        {/* TODO: `src` property should reference to user avatar database column */}
                        <AvatarImage src="https://www.clipartmax.com/png/middle/105-1055054_view-golang-think-logo-golang.png"/>
                        {/* TODO: fallback should be fullfilled with the first letters of the user name and lastname */}
                        <AvatarFallback>GO</AvatarFallback>
                    </Avatar>
                </div>
            </nav>

            <section className="flex flex-col flex-grow h-full">
                {/* TODO: `defaultValue` should come from query parameters in order to provide the state of the current view */}
                <Tabs defaultValue={defaultViewMode} className="flex flex-col flex-grow">
                    <header className="flex flex-col gap-1 items-center flex-grow-0">
                        <TabsList className="px-3 py-6 w-full md:max-w-max">
                            <TabsTrigger className="w-full md:w-[100px]" value={VIEW_MODES.KANBAN}>Kanban</TabsTrigger>
                            <TabsTrigger className="w-full md:w-[100px]" value={VIEW_MODES.LIST}>List</TabsTrigger>
                        </TabsList>
                    </header>

                    <div className="flex justify-center items-center flex-grow">
                        <TabsContent value={VIEW_MODES.KANBAN}>
                            {/* TODO: should render Kanban visualization component */}
                            <p>This is the kanban</p>
                        </TabsContent>

                        <TabsContent value={VIEW_MODES.LIST}>
                            {/* TODO: should render List visualization component */}
                            <p>This is the list</p>
                        </TabsContent>
                    </div>
                </Tabs>
            </section>
        </main>
    )
}