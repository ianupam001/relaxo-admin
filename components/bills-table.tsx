"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { billsApi } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import type { Bill } from "@/types/bill"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BillsTable() {
  const router = useRouter()
  const [bills, setBills] = useState<Bill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true)
        const data = await billsApi.getAll()
        setBills(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bills")
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  const handleSearch = async () => {
    if (!searchTerm) {
      try {
        setLoading(true)
        const data = await billsApi.getAll()
        setBills(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bills")
      } finally {
        setLoading(false)
      }
      return
    }

    try {
      setLoading(true)
      // Check if search term is a phone number
      if (/^\d+$/.test(searchTerm)) {
        const data = await billsApi.getByPhone(searchTerm)
        setBills(data)
      } else {
        // If not a phone number, filter the existing bills
        const data = await billsApi.getAll()
        const filtered = data.filter(
          (bill) =>
            bill.transactionalData.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.loyaltyData.cardHolderName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setBills(filtered)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search bills")
    } finally {
      setLoading(false)
    }
  }

  const filteredBills = bills.filter(
    (bill) =>
      bill.transactionalData.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerData.phone.includes(searchTerm) ||
      bill.loyaltyData.cardHolderName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by invoice, phone or name..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredBills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No bills found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBills.map((bill) => (
                <TableRow key={bill._id}>
                  <TableCell className="font-medium">{bill.transactionalData.invoiceNumber}</TableCell>
                  <TableCell>{bill.transactionalData.invDate}</TableCell>
                  <TableCell>{bill.loyaltyData.cardHolderName}</TableCell>
                  <TableCell>{bill.customerData.phone}</TableCell>
                  <TableCell>{formatCurrency(bill.billAmountData.netPayableAmount)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {bill.paymentData.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" onClick={() => router.push(`/dashboard/bills/${bill._id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
