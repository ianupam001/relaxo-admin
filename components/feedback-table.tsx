"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { feedbackData } from "@/data/feedback"

export function FeedbackTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFeedback = feedbackData.filter(
    (feedback) =>
      feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.phone.includes(searchTerm),
  )

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
            {filteredFeedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.customerName}</TableCell>
                  <TableCell>{feedback.phone}</TableCell>
                  <TableCell>
                    <StarRating rating={feedback.rating} />
                  </TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell className="max-w-xs truncate">{feedback.comment}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost">View</Button>
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
