import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/admin");
			const isOnCart = nextUrl.pathname.startsWith("/cart");
			const isOnUser = nextUrl.pathname.startsWith("/user");

			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			}
			//  else if (isLoggedIn) {
			// 	return Response.redirect(new URL("/admin", nextUrl));
			// }
			return true;
		},

		jwt: async ({ token, user }) => {
			if (user) token = user as unknown as { [key: string]: any };
			console.log(token);
			return token;
		},
		session: async ({ session, token }) => {
			console.log({ session, token });
			session.user = { ...token };
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			// name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				const bodyData = {
					email,
					password,
				};
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login/password`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(bodyData),
					}
				);
				// tipar peticion de user

				const user = await res.json();

				console.log("login user auth config: ", user);
				if (res.ok && user) {
					// mostrar el encabezado de autorización en la consola
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	secret: "supersecret",
} satisfies NextAuthConfig;
