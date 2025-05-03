"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { billsApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Bill } from "@/types/bill"

export function Overview() {
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true)
        const bills = await billsApi.getAll()

        // Initialize monthly data
        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
          name: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
          total: 0,
        }))

        // Aggregate bill amounts by month
        bills.forEach((bill: Bill) => {
          const dateParts = bill.transactionalData.invDate.split("/")
          const month = Number.parseInt(dateParts[1]) - 1 // Month is 0-indexed in JS Date

          if (!isNaN(month) && month >= 0 && month < 12) {
            monthlyData[month].total += bill.billAmountData.netPayableAmount
          }
        })

        setChartData(monthlyData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data for chart")
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip formatter={(value: number) => [`₹${value}`, "Revenue"]} cursor={{ fill: "rgba(0, 128, 0, 0.1)" }} />
        <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
