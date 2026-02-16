"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps { data: { month: string; revenue: number }[] }

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2C31" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5C5C64" }} />
          <YAxis tick={{ fontSize: 12, fill: "#5C5C64" }} tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`} />
          <Tooltip formatter={(value) => [`₪${Number(value).toLocaleString()}`, "הכנסות"]} contentStyle={{ borderRadius: "12px", border: "1px solid #2C2C31", backgroundColor: "#222226", color: "#EAEAEC", fontSize: "13px" }} />
          <Bar dataKey="revenue" fill="#5CB8A4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
