"use client";

import { useMemo } from "react";
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function UsersMonthlyChart({ usersData = [] }) {
  // Aggregate users by month
  const chartData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const monthCounts = {};
    
    // Initialize all months to 0
    months.forEach((m) => { monthCounts[m] = 0; });
    
    // Count users per month
    usersData.forEach((user) => {
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        if (date.getFullYear() === currentYear) {
          const monthName = months[date.getMonth()];
          monthCounts[monthName]++;
        }
      }
    });
    
    // Convert to array format for chart
    return months.slice(0, new Date().getMonth() + 1).map((month) => ({
      month,
      users: monthCounts[month],
    }));
  }, [usersData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold mb-4">Users Monthly ({usersData.length} total)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
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
