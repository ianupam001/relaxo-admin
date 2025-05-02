import { BillsTable } from "@/components/bills-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Bills</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
          <CardDescription>Manage and view all customer bills</CardDescription>
        </CardHeader>
        <CardContent>
          <BillsTable />
        </CardContent>
      </Card>
    </div>
  )
}
