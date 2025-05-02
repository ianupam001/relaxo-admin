"use client"

import { useRouter } from "next/navigation"
import { billsData } from "@/data/bills"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function RecentBills() {
  const router = useRouter()
  // Sort bills by date (newest first) and take the first 5
  const recentBills = [...billsData]
    .sort((a, b) => {
      const dateA = new Date(a.transactionalData.invDate.split("/").reverse().join("-"))
      const dateB = new Date(b.transactionalData.invDate.split("/").reverse().join("-"))
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {recentBills.map((bill) => (
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
      ))}
    </div>
  )
}
