import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    // BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

type User = {
    first_name: string
    last_name: string
    id: string
    email: string
    phone: string
}

function Dashboard() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("accessToken")
            console.log(token)

            if (!token) return

            const response = await fetch("http://127.0.0.1:8000/user/get_user_data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            })

            console.log(response)

            if (response.ok) {
                const data = await response.json()
                setUser(data)
                console.log(data)
            } else {
                console.error('Erro ao buscar dados do usuário', response.statusText)
            }
        }

        fetchUser()
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {user ? (
                                            <div>
                                                <p>Bem vindo, {user.first_name} {user.last_name}</p>
                                            </div>
                                        ) : <p>Carregando...</p>}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <h2>Dashboard</h2>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

export default Dashboard