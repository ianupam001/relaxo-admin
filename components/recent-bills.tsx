"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { billsApi } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Bill } from "@/types/bill"

export function RecentBills() {
  const router = useRouter()
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true)
        const data = await billsApi.getAll()
        setBills(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch recent bills")
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  // Sort bills by date (newest first) and take the first 5
  const recentBills = [...bills]
    .sort((a, b) => {
      const dateA = new Date(a.transactionalData.invDate.split("/").reverse().join("-"))
      const dateB = new Date(b.transactionalData.invDate.split("/").reverse().join("-"))
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

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
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16 ml-auto" />
            <Skeleton className="h-8 w-16 ml-2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {recentBills.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">No recent bills found</div>
      ) : (
        recentBills.map((bill) => (
          <div key={bill._id} className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{bill.loyaltyData.cardHolderName}</p>
              <p className="text-sm text-muted-foreground">{bill.transactionalData.invDate}</p>
            </div>
            <div className="ml-auto font-medium">{formatCurrency(bill.billAmountData.netPayableAmount)}</div>
            <Button variant="ghost" className="ml-2" onClick={() => router.push(`/dashboard/bills/${bill._id}`)}>
              View
            </Button>
          </div>
        ))
      )}
    </div>
  )
}
