import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/dashboard")

  // Get the authentication token from localStorage
  const token = request.cookies.get("token")?.value

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !token) {
    // Create a URL for the login page
    const loginUrl = new URL("/", request.url)

    // Return a redirect response
    return NextResponse.redirect(loginUrl)
  }

  // If the path is login and there's a token, redirect to dashboard
  if (path === "/" && token) {
    // Create a URL for the dashboard
    const dashboardUrl = new URL("/dashboard", request.url)

    // Return a redirect response
    return NextResponse.redirect(dashboardUrl)
  }

  // Continue with the request
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
