import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getAdminUser } from "@/lib/admin-auth";
import Loading from "@/components/ui/Loading";

const AdminDashboard = dynamic(() => import("@/components/admin/AdminDashboard"), {
  loading: () => <Loading />,
  ssr: false,
});

export const metadata = { title: "לוח בקרה - ניהול" };

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminDashboard />;
}
