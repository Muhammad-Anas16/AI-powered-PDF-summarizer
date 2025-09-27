// // "use client"

// // import { AppSidebar } from "@/components/app-sidebar"
// // import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// // import { useIsMobile } from "@/hooks/use-mobile"

// // export default function Layout({ children }) {
// //   const isMobile = useIsMobile()

// //   return (
// //     <SidebarProvider defaultOpen={!isMobile}>
// //       <AppSidebar />
// //       <main className="flex-1 flex flex-col gap-6 p-4">
// //         {/* Show toggle button only on small screens */}
// //         {isMobile && <SidebarTrigger />}
// //         {children}
// //       </main>
// //     </SidebarProvider>
// //   )
// // }

// "use client"

// import { AppSidebar } from "@/components/app-sidebar"
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { useIsMobile } from "@/hooks/use-mobile"
// import Navbar from "@/components/common/Navbar"
// import Footer from "@/components/common/Footer"

// export default function Layout({ children }) {
//   const isMobile = useIsMobile()

//   return (
//     <SidebarProvider defaultOpen={!isMobile}>
//       <AppSidebar />
//       <main className="flex-1 flex flex-col min-h-screen">
//         <Navbar />

//         {isMobile && (
//           <div className="p-2">
//             <SidebarTrigger />
//           </div>
//         )}

//         <div className="flex-1 p-4">{children}</div>
//         <Footer />
//       </main>
//     </SidebarProvider>
//   )
// }

"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"

export default function Layout({ children }) {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        {isMobile && (
          <div className="p-2">
            <SidebarTrigger />
          </div>
        )}

        <div className="flex-1 p-4">{children}</div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}
