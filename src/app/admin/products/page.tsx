import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminProducts from "@/components/admin/AdminProducts";

export const metadata = { title: "ניהול מוצרים" };

export default async function AdminProductsPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminProducts />;
}
