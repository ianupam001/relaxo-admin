"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { billsData } from "@/data/bills"
import { formatCurrency } from "@/lib/utils"

export function BillsTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBills = billsData.filter(
    (bill) =>
      bill.transactionalData.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerData.phone.includes(searchTerm) ||
      bill.loyaltyData.cardHolderName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search bills..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            {filteredBills.length === 0 ? (
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
