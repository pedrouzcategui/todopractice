import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VIEW_MODES = {
    KANBAN: "kanban",
    LIST: "list"
} as const

type ViewMode = keyof typeof VIEW_MODES

/**
 * Expected query parameters for `DashboardPage`
 */
type SearchParams = {
    view: ViewMode
}

export default function DashboardPage({ searchParams }: { searchParams: SearchParams } ) {
    const { view: defaultViewMode } = searchParams

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
        <main className="min-h-screen p-12 flex flex-col gap-8">
            <nav className="flex-grow-0">
                <div className="flex gap-6">
                    <Select>
                        <SelectTrigger className="w-1/5">
                            <SelectValue placeholder="Workspace" />
                        </SelectTrigger>   

                        <SelectContent>
                            {WORKSPACES.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem> 
                            ))}
                        </SelectContent>
                    </Select> 

                    <Input placeholder="Search for a task (Ctrl + K)" />

                    <Avatar className="rounded-md">
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
                        <TabsList className="px-3 py-6">
                            <TabsTrigger className="w-[100px]" value={VIEW_MODES.KANBAN}>Kanban</TabsTrigger>
                            <TabsTrigger className="w-[100px]" value={VIEW_MODES.LIST}>List</TabsTrigger>
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