// components/layout/dashboard-layout.jsx
import Sidebar from "@/components/layout/sidebar";
import MenuBar from "@/components/layout/menu-bar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <MenuBar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
