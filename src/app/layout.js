import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import NavMenu from "@/components/nav-menu";
import TopBreadcrumb from "@/components/TopBreadcrumb";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Application",
  description: "A simple carry bag ledger application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <header className="flex gap-10 items-center p-2">
              <SidebarTrigger />
              <TopBreadcrumb />
              {/* <NavMenu /> */}
            </header>

            <div className="p-10 w-full">
              <div className="p-5 shadow-lg rounded-xl bg-neutral-100 w-full">
                {children}
              </div>
            </div>
            <Footer />
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
