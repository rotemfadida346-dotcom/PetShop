import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = { title: "לוח בקרה - ניהול" };

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminDashboard />;
}
