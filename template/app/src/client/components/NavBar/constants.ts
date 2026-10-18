import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";
export const marketingNavigationItems:NavigationItem[]=[
{name:"Agents",to:"/agents"},{name:"Client Portal",to:"/portal"},{name:"Solutions",to:"/#solutions"},{name:"AI Partner",to:"/#ai-partner"},
{name:"Pricing",to:"/pricing"},{name:"Support",to:"/support"}
];
export const demoNavigationitems:NavigationItem[]=[
{name:"My AI Agents",to:"/portal"},{name:"My Connections",to:"/portal/credentials"},{name:"Support",to:"/support"}
];
