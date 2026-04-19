"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Logo from "@/assets/logo/logo";
import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import {
  AlignStartVertical,
  CreditCard,
  LayoutPanelTop,
  ChartPie,
  BarChart3,
  CircleUserRound,
  ClipboardList,
  Languages,
  type LucideIcon,
  Notebook,
  NotepadText,
  Table,
  Ticket,
} from "lucide-react";
import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import type { LinkProps } from "@tanstack/react-router";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: LinkProps["to"];
  children?: NavItem[];
  isActive?: boolean;
};

export const navData: NavItem[] = [
  // Dashboards Section
  { label: "Dashboards", isSection: true },
  { title: "Analytics", icon: BarChart3, href: "/about", isActive: true },
  { title: "CRM Dashboard", icon: ClipboardList, href: "/about" },

  // Pages Section
  { label: "Pages", isSection: true },
  { title: "Tables", icon: Table, href: "/about" },
  { title: "Forms", icon: ClipboardList, href: "/about" },
  { title: "User Profile", icon: CircleUserRound, href: "/about" },

  // Apps Section
  { label: "Apps", isSection: true },
  { title: "Notes", icon: Notebook, href: "/about" },
  { title: "Tickets", icon: Ticket, href: "/about" },
  {
    title: "Blogs",
    icon: Languages,
    children: [
      { title: "Blog Post", href: "/about" },
      { title: "Blog Detail", href: "/about" },
      { title: "Blog Edit", href: "/about" },
      { title: "Blog Create", href: "/about" },
      { title: "Manage Blogs", href: "/about" },
    ],
  },

  // Form Elements Section
  { label: "Form Elements", isSection: true },
  {
    title: "Shadcn Forms",
    icon: NotepadText,
    children: [
      { title: "Button", href: "/about" },
      { title: "Input", href: "/about" },
      { title: "Select", href: "/about" },
      { title: "Checkbox", href: "/about" },
      { title: "Radio", href: "/about" },
    ],
  },
  {
    title: "Form layouts",
    icon: AlignStartVertical,
    children: [
      { title: "Forms Horizontal", href: "/about" },
      { title: "Forms Vertical", href: "/about" },
      { title: "Forms Validation", href: "/about" },
      { title: "Forms Examples", href: "/about" },
      { title: "Forms Wizard", href: "/about" },
    ],
  },
  { label: "WIDGETS", isSection: true },
  {
    title: "Cards",
    icon: CreditCard,
    children: [
      { title: "Ecommerce Actions", href: "/about" },
      { title: "Course ", href: "/about" },
      { title: "Campaign Performance ", href: "/about" },
      { title: "Selling Products ", href: "/about" },
      { title: "Activity Timeline ", href: "/about" },
    ],
  },
  {
    title: "Banners",
    icon: LayoutPanelTop,
    children: [{ title: "Analytic Banner ", href: "/about" }],
  },
  {
    title: "Charts",
    icon: ChartPie,
    children: [
      { title: "Sales Report", href: "/about" },
      { title: "Weekly Sales", href: "/about" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar className="py-4 px-0 bg-background">
        <div className="flex flex-col gap-6 bg-background">
          {/* ---------------- Header ---------------- */}
          <SidebarHeader className="py-0 px-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="#" className="w-full h-full">
                  <Logo />
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* ---------------- Content ---------------- */}
          <SidebarContent className="overflow-hidden gap-0 px-0">
            <SimpleBar
              autoHide={true}
              className="h-[calc(100vh-10px)] border-b border-border"
            >
              <div className="px-4">
                <NavMain items={navData} />
              </div>
            </SimpleBar>
            {/* card */}
          </SidebarContent>
        </div>
      </Sidebar>

      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3 bg-background">
          <SiteHeader />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
