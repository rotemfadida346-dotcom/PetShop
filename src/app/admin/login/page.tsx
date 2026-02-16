import { Metadata } from "next";
import Container from "@/components/ui/Container";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = { title: "כניסת מנהל" };

export default function AdminLoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <Container size="sm">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold text-black">פאנל ניהול</h1>
            <p className="text-muted mt-1">כניסה למנהלים בלבד</p>
          </div>
          <AdminLoginForm />
        </div>
      </Container>
    </div>
  );
}
