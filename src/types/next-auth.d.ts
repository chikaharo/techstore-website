import NextAuth, { DefaultSession, Session, User } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** Oauth access token */
			accessToken?: accessToken;
		} & SessionUser;
	}

	// interface User extends DefaultUser {
	// 	role: "admin" | "user";
	// }

	interface SessionUser {
		user?: {
			_id?: sring | null;
			name?: string | null;
			email?: string | null;
			role?: string | null;
		};
		expires: ISODateString;
	}
}
