import { LayoutDashboard, User2Icon } from "lucide-react";

export const adminSidebarLink = [
  { label: "Account Info", link: "/admin", icon: <LayoutDashboard /> },
  { label: "Event Approval", link: "/admin/event-approve", icon: <LayoutDashboard /> },
  { label: "User Manage", link: "/admin/dashboard", icon: <User2Icon /> },
];

export const userSidebarLink = [
  { label: "Info", link: "/user/userInfo", icon: <LayoutDashboard /> },
  { label: "My Events", link: "/user/user-events", icon: <User2Icon /> },
  { label: "Host Control", link: "/user/host-control", icon: <User2Icon /> },
];
