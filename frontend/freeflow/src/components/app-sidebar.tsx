"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
} from "lucide-react"
import { useLocation } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

type User = {
  first_name: string
  last_name: string
  email: string
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("accessToken")
      if (!token) return

      try {
        const response = await fetch("http://127.0.0.1:8000/user/get_user_data", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err)
      }
    }

    fetchUser()
  }, [])

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: location.pathname === "/dashboard",
      items: [],
    },
    {
      title: "Clientes",
      url: "/customers",
      icon: Users,
      isActive: location.pathname === "/customers",
      items: [],
    },
  ]

  const userData = user
    ? {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        avatar: "",
      }
    : {
        name: "Usuário",
        email: "",
        avatar: "",
      }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <h2 className="font-semibold text-lg">FreeFlow</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
