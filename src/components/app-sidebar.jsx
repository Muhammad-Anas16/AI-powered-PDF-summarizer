// "use client"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/components/ui/sidebar"

// import { Home, FileText, File, Upload } from "lucide-react"

// export function AppSidebar() {
//   const items = [
//     { title: "Get Started", id: "getStarted", icon: Home },
//     { title: "Generate PDF", id: "generatePdf", icon: File },
//     { title: "Your Summaries", id: "summaries", icon: FileText },
//   ]

//   return (
//     <Sidebar collapsible="offcanvas">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu className="flex flex-col gap-1">
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.id}>
//                       <item.icon className="mr-2 h-4 w-4" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="flex flex-col gap-5 py-5">
//         <button className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
//           <Upload className="mr-2 h-4 w-4" />
//           Upload PDF
//         </button>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs";

import { Home, FileText, File, Upload, Image } from "lucide-react"

export function AppSidebar() {

    const { user } = useUser();

  const items = [
    // { title: "Get Started", id: "getStarted", icon: Home },
    { title: "Summerize PDF Text", id: "generatePdfToText", icon: File },
    { title: "Summerize image Text", id: "generateImageToText", icon: Image },
    { title: "Your Summaries", id: "summaries", icon: FileText },
  ]

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`?section=${item.id}`}>
                      <item.icon className="mr-2 h-4 w-4 text-[#0396F2]" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-5 py-5">
        <div className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 cursor-pointer">
          {user?.primaryEmailAddress?.emailAddress || "No Email"}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
