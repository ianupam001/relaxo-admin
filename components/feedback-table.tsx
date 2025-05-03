"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { feedbackApi } from "@/lib/api"
import type { Feedback } from "@/types/feedback"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function FeedbackTable() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true)
        const data = await feedbackApi.getAll()
        console.log("Feedback data:", data) // Log the data to see its structure
        setFeedback(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch feedback")
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  // Safely filter feedback with null checks
  const filteredFeedback = feedback.filter((item) => {
    const customerNameMatch = item.customerName && item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const phoneMatch = item.phone && item.phone.includes(searchTerm)
    return customerNameMatch || phoneMatch
  })

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
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search feedback..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredFeedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFeedback.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="font-medium">{item.customerName || "Unknown"}</TableCell>
                  <TableCell>{item.phone || "N/A"}</TableCell>
                  <TableCell>
                    <StarRating rating={item.rating || 0} />
                  </TableCell>
                  <TableCell>{item.date || "N/A"}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.comment || "No comment"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => window.alert(`View feedback details for ID: ${item.id || "unknown"}`)}
                    >
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
