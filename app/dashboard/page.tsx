"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentBills } from "@/components/recent-bills"
import { billsApi } from "@/lib/api"
import { feedbackApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Bill } from "@/types/bill"
import type { Feedback } from "@/types/feedback"

export default function Dashboard() {
  const [billsCount, setBillsCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [feedbackScore, setFeedbackScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch bills data
        const bills = await billsApi.getAll()
        setBillsCount(bills.length)

        // Calculate total revenue
        const revenue = bills.reduce((total: number, bill: Bill) => total + bill.billAmountData.netPayableAmount, 0)
        setTotalRevenue(revenue)

        // Fetch feedback data and calculate average score
        const feedback = await feedbackApi.getAll()
        if (feedback.length > 0) {
          const validFeedback = feedback.filter((item) => typeof item.rating === "number")
          if (validFeedback.length > 0) {
            const avgScore =
              validFeedback.reduce((sum: number, item: Feedback) => sum + (item.rating || 0), 0) / validFeedback.length
            setFeedbackScore(Number.parseFloat(avgScore.toFixed(1)))
          } else {
            setFeedbackScore(0)
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{billsCount}</div>
                <p className="text-xs text-muted-foreground">All processed bills</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ₹{totalRevenue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">From all transactions</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{feedbackScore}</div>
                <p className="text-xs text-muted-foreground">Average customer rating</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
            <CardDescription>Latest processed bills</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentBills />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
