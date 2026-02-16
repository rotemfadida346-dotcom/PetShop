import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminUsers from "@/components/admin/AdminUsers";

export const metadata = { title: "משתמשים - ניהול" };

export default async function AdminUsersPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return <AdminUsers />;
}
