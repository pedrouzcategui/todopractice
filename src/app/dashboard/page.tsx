import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardPage() {
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
        <main className="min-h-screen p-12">
            <nav className="flex flex-col gap-4">
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

                <div>

                </div>
            </nav>

            <section className="h-full">
            </section>
        </main>
    )
}