"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps { data: { month: string; revenue: number }[] }

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#707070" }} />
          <YAxis tick={{ fontSize: 12, fill: "#707070" }} tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            formatter={(value) => [`₪${Number(value).toLocaleString()}`, "הכנסות"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #2A2A2A", backgroundColor: "#1E1E1E", color: "#F5F5F5", fontSize: "13px" }}
          />
          <Bar dataKey="revenue" fill="#2ABAA0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
