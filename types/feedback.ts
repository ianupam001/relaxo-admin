export interface Feedback {
  id?: string
  customerName?: string
  phone?: string
  rating?: number
  date?: string
  comment?: string
  // Add any other fields that might be in the API response
  [key: string]: any
}
