"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", users: 40 },
  { month: "Feb", users: 35 },
  { month: "Mar", users: 50 },
  { month: "Apr", users: 55 },
  { month: "May", users: 60 },
];

export default function UsersMonthlyChart() {
  return (
    <div className="w-full">
      <h2 className="text-sm font-semibold mb-4 md:text-lg">Users Monthly</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#0000FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
