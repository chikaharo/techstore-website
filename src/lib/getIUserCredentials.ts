import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export type UserCredentials = {
	refreshToken: string;
	accessToken: string;
	tokenExpires: number;
};

export function getUserCredentials(req: NextRequest) {
	// getting the tookes from the cookie
	// const session = await getSession();
	// const cookieStore = cookies();
	// console.log(
	// 	"get User credentials sesison: ",
	// 	cookieStore.getAll("next-auth.session-token")
	// );

	// console.log("getUserCredentials");
	let tokens = req.cookies.get("next-auth.session-token")?.value;
	console.log("getUser Credentials tokens: ", tokens);
	if (!tokens) return null;
	const credentials = JSON.parse(tokens) as UserCredentials;
	return tokens;
}
