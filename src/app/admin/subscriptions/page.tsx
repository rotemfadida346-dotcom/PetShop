import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminSubscriptions from "@/components/admin/AdminSubscriptions";

export const metadata = { title: "ניהול מנויים" };

export default async function AdminSubscriptionsPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminSubscriptions />;
}
