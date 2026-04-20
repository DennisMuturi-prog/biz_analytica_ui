"use client"

import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import type { NavItem } from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons"

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  // Recursive render function
  const renderItem = (item: NavItem) => {
    //  Section label
    if (item.isSection && item.label) {
      return (
        <SidebarGroup key={item.label} className="p-0 pt-5 first:pt-0">
          <SidebarGroupLabel className="p-0 text-xs font-medium text-sidebar-foreground uppercase">
            {item.label}
          </SidebarGroupLabel>
        </SidebarGroup>
      )
    }
    const hasChildren = !!item.children?.length
    // Item with children → collapsible
    if (hasChildren && item.title) {
      return (
        <SidebarGroup key={item.title} className="p-0">
          <SidebarMenu>
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger
                  asChild
                  className="collapsible/button w-full"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="h-9 cursor-pointer rounded-xl px-3 py-2 text-sm"
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.title}</span>
                    <ChevronRight className="collapsible/button-[aria-expanded='true']:rotate-90 ml-auto transition-transform duration-200" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="me-0 pe-0">
                    {item.children!.map(renderItemSub)}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      )
    }
    // Item without children
    if (item.title) {
      const isActive = item.isActive ?? pathname === item.href

      return (
        <SidebarGroup key={item.title} className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "h-9 rounded-lg px-3 py-2 text-sm",
                  isActive
                    ? "bg-primary text-white hover:bg-primary hover:text-white dark:bg-blue-500 dark:hover:bg-blue-500"
                    : ""
                )}
              >
                {item.icon && <item.icon />}
                <Link to={item.href} className="w-full">
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )
    }
    return null
  }
  // Recursive render function for sub-items
  const renderItemSub = (item: NavItem) => {
    const hasChildren = !!item.children?.length
    if (hasChildren && item.title) {
      return (
        <SidebarMenuSubItem key={item.title}>
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuSubButton className="h-9 rounded-xl px-3 py-2 text-sm">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 data-[state=open]:rotate-90" />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="me-0 pe-0">
                {item.children!.map(renderItemSub)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuSubItem>
      )
    }
    if (item.title) {
      return (
        <SidebarMenuSubItem key={item.title} className="w-full">
          <SidebarMenuSubButton asChild className="w-full">
            <Link to={item.href} className="w-full">
              {item.title}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )
    }
    return null
  }

  return (
    <>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          asChild
            tooltip="Quick Create"
            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <Link to="/upload">
            <HugeiconsIcon icon={PlusSignCircleIcon} strokeWidth={2} />
            <span>Upload Doc</span>
            
          </Link>
            
            
          </SidebarMenuButton>
        
      </SidebarMenuItem>

      {items.map(renderItem)}
    </>
  )
}
