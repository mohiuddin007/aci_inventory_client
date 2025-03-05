"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAnalytics } from "@/lib/api/dashboard";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching analytics</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Inventory Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.totalProducts}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.productCountsByCategory.length}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products per Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.productCountsByCategory.map((cat) => ({
                name: cat._id,
                count: cat.count,
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recently Added Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.recentProducts.map((product, index) => (
              <li key={index} className="border p-2 rounded-lg">
                <p className="text-sm">{product.barcode}</p>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Category: {product.category}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
