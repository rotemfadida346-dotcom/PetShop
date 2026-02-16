"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import { Users, Shield, Clock } from "lucide-react";

interface AdminUser { id: string; name: string | null; email: string; role: string; createdAt: string; updatedAt: string }

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users").then((r) => r.json()).then((d) => { setUsers(d.users || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center text-text-secondary">טוען...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-accent" />
        <h1 className="text-heading-lg text-text-primary">משתמשי ניהול</h1>
      </div>

      <div className="bg-accent/5 border border-accent/15 rounded-xl p-4 mb-6">
        <p className="text-body-sm text-text-secondary">רק 2 משתמשים יכולים לגשת לפאנל הניהול. אין אפשרות להוסיף משתמשים נוספים.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((u) => (
          <div key={u.id} className="bg-card rounded-2xl border border-card-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center"><Shield className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="font-bold text-text-primary">{u.name || "ללא שם"}</p>
                  <p className="text-body-sm text-text-secondary">{u.email}</p>
                </div>
              </div>
              <Badge variant={u.role === "ADMIN" ? "accent" : "default"}>{u.role === "ADMIN" ? "מנהל" : "לקוח"}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-card-border">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">תפקיד</p>
                <p className="text-body-sm font-medium text-text-primary mt-0.5">{u.role === "ADMIN" ? "Owner / Admin" : "Customer"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">נוצר</p>
                <p className="text-body-sm font-medium text-text-primary mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(u.createdAt).toLocaleDateString("he-IL")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
