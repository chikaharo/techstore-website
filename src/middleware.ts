// const isProtectedRoute = createRouteMatcher(["/test(.*)", "/forum(.*)"]);

// export const config = {
// 	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

// export function middleware(request: NextRequest) {
// 	const currentUser = request.cookies.get("next-auth.session-token")?.value;
// 	console.log("request: ", request);

// 	if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
// 		return Response.redirect(new URL("/", request.url));
// 	}

// 	if (currentUser && request.nextUrl.pathname.startsWith("/register")) {
// 		return Response.redirect(new URL("/", request.url));
// 	}

// 	if (!currentUser && request.nextUrl.pathname.startsWith("/cart")) {
// 		return Response.redirect(new URL("/login", request.url));
// 	}
// 	if (!currentUser && request.nextUrl.pathname.startsWith("/user")) {
// 		return Response.redirect(new URL("/login", request.url));
// 	}
// }

// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

// import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL("/home", request.url));
// }

export default NextAuth(authConfig).auth;

export const config = {
	// matcher: "/about/:path*",
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
