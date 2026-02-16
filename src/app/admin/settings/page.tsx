import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminSettings from "@/components/admin/AdminSettings";

export const metadata = { title: "הגדרות אתר" };

export default async function AdminSettingsPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminSettings />;
}
