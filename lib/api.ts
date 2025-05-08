import type { Bill } from "@/types/bill";
import type { Feedback } from "@/types/feedback";

const BASE_URL = "http://20.204.134.0/server";

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Helper function to get the auth token from cookies
const getToken = (): string | null => {
  return getCookie("token");
};

// Helper function for API requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`
    );
  }

  return response.json();
}

// Bills API
export const billsApi = {
  getAll: async (): Promise<Bill[]> => {
    return fetchWithAuth("/api/bills");
  },

  getByPhone: async (phone: string): Promise<Bill[]> => {
    return fetchWithAuth(`/api/bills/${phone}`);
  },

  getById: async (id: string): Promise<Bill> => {
    const bills = await fetchWithAuth("/api/bills");
    const bill = bills.find((b: Bill) => b._id === id);

    if (!bill) {
      throw new Error("Bill not found");
    }

    return bill;
  },
};

// Feedback API
export const feedbackApi = {
  getAll: async (): Promise<Feedback[]> => {
    return fetchWithAuth("/api/feedback");
  },

  getById: async (id: string): Promise<Feedback> => {
    return fetchWithAuth(`/api/feedback/${id}`);
  },
};
