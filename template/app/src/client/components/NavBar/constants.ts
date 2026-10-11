import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";
export const marketingNavigationItems: NavigationItem[] = [
 {name:"Agents",to:"/#agents"}, {name:"Solutions",to:"/#solutions"}, {name:"AI Partner",to:"/#ai-partner"},
 {name:"Company",to:"/#results"}, {name:"Resources",to:"/#contact"}, {name:"Blog",to:BlogUrl}
];
export const demoNavigationitems: NavigationItem[] = [
 {name:"AI Scheduler",to:routes.DemoAppRoute.to}, {name:"File Upload",to:routes.FileUploadRoute.to},
 {name:"Documentation",to:DocsUrl},{name:"Blog",to:BlogUrl}
];
