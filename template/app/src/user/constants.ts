import { LayoutDashboard, Settings, Shield, KeyRound } from "lucide-react";
import { routes } from "wasp/client/router";

export const userMenuItems = [
  {name:"My Agent Credentials",to:routes.AgentCredentialsRoute.to,icon:KeyRound,isAuthRequired:true,isAdminOnly:false},
  {name:"My AI Agents",to:routes.PortalRoute.to,icon:LayoutDashboard,isAuthRequired:true,isAdminOnly:false},
  {
    name: "AI Scheduler (Demo App)",
    to: routes.DemoAppRoute.to,
    icon: LayoutDashboard,
    // Template demo: hidden from customers, still reachable for admins.
    isAdminOnly: true,
    isAuthRequired: true,
  },
  {
    name: "Account Settings",
    to: routes.AccountRoute.to,
    icon: Settings,
    isAuthRequired: false,
    isAdminOnly: false,
  },
  {
    name: "Admin Dashboard",
    to: routes.AdminRoute.to,
    icon: Shield,
    isAuthRequired: false,
    isAdminOnly: true,
  },
] as const;
