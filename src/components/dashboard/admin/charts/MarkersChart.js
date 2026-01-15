"use client";

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

const data = [
  { month: "Jan", markers: 20 },
  { month: "Feb", markers: 25 },
  { month: "Mar", markers: 30 },
  { month: "Apr", markers: 28 },
  { month: "May", markers: 35 },
];

export default function MarkersChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold mb-4">Markers Monthly</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
