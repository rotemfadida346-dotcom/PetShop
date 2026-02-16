import { getAdminUser } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import Container from "@/components/ui/Container";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  if (!user) {
    return <div className="bg-gray-50 min-h-screen">{children}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black text-white">
        <Container>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← חנות</a>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-sm">פאנל ניהול</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{user.name || user.email}</span>
              <AdminLogoutButton />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex gap-8 py-8">
          <AdminSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
