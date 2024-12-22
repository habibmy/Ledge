import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavGroup from "./NavGroup";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const salesItems = [
  {
    title: "Sales",
    icon: ShoppingCart,
    subItems: [
      {
        title: "Customers",
        url: "/customers",
        addNewUrl: "/customers/add",
      },
      {
        title: "Payments Received",
        url: "/payments",
        addNewUrl: "/payments/add",
      },
      {
        title: "View Sales",
        url: "/sales",
        addNewUrl: "/sales/add",
      },
    ],
  },
  {
    title: "Purchase",
    icon: ShoppingBag,
    subItems: [
      {
        title: "Vendors",
        url: "/vendors",
        addNewUrl: "/vendors/add",
      },
      {
        title: "Payments Made",
        url: "/vendorPayments",
        addNewUrl: "/vendorPayments/add",
      },
      {
        title: "View Purchases",
        url: "/purchases",
        addNewUrl: "/purchases/add",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <NavGroup data={salesItems} />
      </SidebarContent>
    </Sidebar>
  );
}
