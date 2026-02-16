import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminOrders from "@/components/admin/AdminOrders";

export const metadata = { title: "ניהול הזמנות" };

export default async function AdminOrdersPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminOrders />;
}
