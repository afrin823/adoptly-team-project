'use client';
import { LuLayoutGrid } from "react-icons/lu";
import { BsFilePost, BsListCheck } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaRegListAlt } from "react-icons/fa";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";


// Menu items.
const items = [
  {
    title: "Overview",
    url: "/userDashboard",
    icon: LuLayoutGrid,
  },
  {
    title: "Profile",
    url: "/userDashboard/user_profile",
    icon: ImProfile,
  },
  {
    title: "Manage Post",
    url: "/userDashboard/manage_post",
    icon: BsFilePost,
  },
  {
    title: "Your Request",
    url: "/userDashboard/request",
    icon: FaRegListAlt,
  },
  {
    title: "Already Adopted",
    url: "/userDashboard/already_adopted",
    icon: BsListCheck,
  },
]

const UserSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel className={"text-xl my-2"}>User Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-[15px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default UserSidebar;