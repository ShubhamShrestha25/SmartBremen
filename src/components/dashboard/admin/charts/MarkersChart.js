"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MarkersChart({ markersData = [] }) {
  // Aggregate markers by month
  const chartData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const monthCounts = {};

    // Initialize all months to 0
    months.forEach((m) => {
      monthCounts[m] = 0;
    });

    // Count markers per month
    markersData.forEach((marker) => {
      if (marker.createdAt) {
        const date = new Date(marker.createdAt);
        if (date.getFullYear() === currentYear) {
          const monthName = months[date.getMonth()];
          monthCounts[monthName]++;
        }
      }
    });

    // Convert to array format for chart
    return months.slice(0, new Date().getMonth() + 1).map((month) => ({
      month,
      markers: monthCounts[month],
    }));
  }, [markersData]);

  // Count by status
  const statusCounts = useMemo(() => {
    const counts = { approved: 0, pending: 0, rejected: 0 };
    markersData.forEach((m) => {
      const status = m.status?.toLowerCase() || "pending";
      if (counts[status] !== undefined) counts[status]++;
    });
    return counts;
  }, [markersData]);

  return (
    <div className="w-full">
      <h2 className="text-sm font-semibold mb-2 md:mb-4 md:text-lg">
        Markers Monthly ({markersData.length} total)
      </h2>
      <div className="flex gap-4 mb-2 text-[10px] md:text-xs">
        <span className="text-green-600">
          ✓ {statusCounts.approved} approved
        </span>
        <span className="text-yellow-600">
          ⏳ {statusCounts.pending} pending
        </span>
        <span className="text-red-600">✗ {statusCounts.rejected} rejected</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="markers" stroke="#6BEE32" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
