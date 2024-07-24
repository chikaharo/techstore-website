import NextAuth, { DefaultSession, Session, User } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** Oauth access token */
			accessToken?: accessToken;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		role: "admin" | "user";
	}
}
