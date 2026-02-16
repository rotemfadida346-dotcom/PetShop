import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminRevenue from "@/components/admin/AdminRevenue";

export const metadata = { title: "הכנסות - ניהול" };

export default async function AdminRevenuePage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return <AdminRevenue />;
}
