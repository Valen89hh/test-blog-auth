import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLogguedIn = !!req.auth

  if(['/login', '/register'].includes(nextUrl.pathname) && isLogguedIn){
    return Response.redirect(new URL("/me", nextUrl))
  }

  if(!isLogguedIn && nextUrl.pathname == "/me"){
    return Response.redirect(new URL("/login", nextUrl))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}