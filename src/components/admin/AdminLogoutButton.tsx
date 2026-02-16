"use client";

export default function AdminLogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-text-text-secondary hover:text-white transition-colors"
    >
      התנתק
    </button>
  );
}
