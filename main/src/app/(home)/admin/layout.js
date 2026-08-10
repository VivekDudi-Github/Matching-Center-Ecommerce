import Sidebar from "@/app/components/admin/Sidebar";
import Navbar from "@/app/components/admin/Navbar";
import MobileSidebar from "@/app/components/admin/MobileSideBar";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Mobile Header */}
          <MobileSidebar />

          { /*Desktop Header */} 
           <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* Page Content */}
          <main className="flex-1 p-2 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}