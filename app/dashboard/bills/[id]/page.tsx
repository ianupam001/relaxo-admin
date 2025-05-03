"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { billsApi } from "@/lib/api"
import type { Bill } from "@/types/bill"
import { formatCurrency } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function BillDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [bill, setBill] = useState<Bill | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBill = async () => {
      try {
        setLoading(true)
        const data = await billsApi.getById(id as string)
        setBill(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bill details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBill()
    }
  }, [id])

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!bill) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Bill not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Bill Details</h1>
        <div className="ml-auto text-sm text-muted-foreground">Invoice #{bill.transactionalData.invoiceNumber}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="font-medium">Phone</div>
              <div>{bill.customerData.phone}</div>
            </div>
            {bill.loyaltyData && (
              <>
                <div>
                  <div className="font-medium">Loyalty Card</div>
                  <div>{bill.loyaltyData.cardNum}</div>
                </div>
                <div>
                  <div className="font-medium">Card Holder</div>
                  <div>{bill.loyaltyData.cardHolderName}</div>
                </div>
                <div>
                  <div className="font-medium">Points Balance</div>
                  <div>{bill.loyaltyData.pointsBalance}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="font-medium">Store</div>
              <div>{bill.storeData.displayAddress}</div>
            </div>
            <div>
              <div className="font-medium">Address</div>
              <div>{bill.storeData.storeAddress}</div>
              <div>PIN: {bill.storeData.pinCode}</div>
            </div>
            <div>
              <div className="font-medium">Contact</div>
              <div>{bill.storeData.storeNumberPrimary}</div>
            </div>
            <div>
              <div className="font-medium">GST Number</div>
              <div>{bill.storeData.storeGstNumber}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            {bill.transactionalData.invoiceType} - {bill.transactionalData.invDate} at {bill.transactionalData.invTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="font-medium">Payment Method</div>
                <div>
                  {bill.paymentData.paymentMethods.map((pm) => `${pm.name} (${formatCurrency(pm.amount)})`).join(", ")}
                </div>
              </div>
              <div>
                <div className="font-medium">Status</div>
                <div className="capitalize">{bill.paymentData.status}</div>
              </div>
              <div>
                <div className="font-medium">Total Amount</div>
                <div className="text-lg font-bold">{formatCurrency(bill.billAmountData.netPayableAmount)}</div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Products</h3>
              <div className="rounded-md border overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        HSN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unit Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        GST
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bill.productsData.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.hsnCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatCurrency(product.unitAmount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.gstPercent}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {formatCurrency(product.totalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-3 text-right text-sm font-medium">
                        Total
                      </td>
                      <td className="px-6 py-3 text-sm font-bold">
                        {formatCurrency(bill.billAmountData.netPayableAmount)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Tax Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bill.taxesData.distributedTax.map((tax, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-md">
                    <div className="text-sm">Taxable Amount: {formatCurrency(tax.taxableAmount)}</div>
                    <div className="text-sm">CGST: {formatCurrency(tax.cgst)}</div>
                    <div className="text-sm">SGST: {formatCurrency(tax.sgst)}</div>
                    <div className="text-sm font-medium mt-1">Total Tax: {formatCurrency(tax.cgst + tax.sgst)}</div>
                  </div>
                ))}
              </div>
            </div>

            {bill.billFooterData && (
              <>
                <Separator />
                <div className="text-sm text-center text-muted-foreground">{bill.billFooterData.disclaimer}</div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
