'use client';

import { AdminThemeProvider, useAdminTheme } from '@/context/AdminThemeContext';
import AdminSidebar from '@/components/AdminSidebar';
import AdminUserProfileModal from '@/components/AdminUserProfileModal';

function AdminLayoutContent({ children }) {
  const { isDarkMode } = useAdminTheme();

  return (
    <div className={`min-h-screen flex font-outfit selection:bg-purple-600 selection:text-white transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>

      {/* Clickable Admin User Profile Modal */}
      <AdminUserProfileModal />
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminThemeProvider>
  );
}
