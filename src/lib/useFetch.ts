import { NextRequest } from "next/server";
import { getUserCredentials } from "./getIUserCredentials";
import { cookies } from "next/headers";
import { useSession } from "next-auth/react";
// import saveUserTokens from "./saveUserTokens";
// import { Tokens } from "../types/tokens";
// import { UnauthorizedResponse } from "../types/unauthorizedResponse";

// Define the backend URL and the maximum time for token refresh
const BASE_URL = process.env["NEXT_PUBLIC_BACKEND_URL"];
const MAX_TIME_REFRESH = 60 * 1000; // Use this to determine when to refresh tokens

// Define the main function for making authenticated requests
export async function fetchWithCredentials(
	path: string,
	method: MethodType = MethodType.GET,
	init?: RequestInit | undefined,
	req?: NextRequest
) {
	// Retrieve user credentials from the request
	const userCredentials = getUserCredentials(req) as string;
	const requestToFetch = makeFetch(path, method, userCredentials, init);
	// If no user credentials are available, return an unauthorized response
	if (!userCredentials) {
		return { message: "No credentials provided", statusCode: 401 };
	}

	// Create a function to make the fetch request with the appropriate credentials
	// If token refresh fails, return the error response

	// If the access token is still valid, proceed with the original request
	return requestToFetch();
}

// Function to refresh user tokens
// async function refresh(rt: string) {
// 	return new Promise<UnauthorizedResponse | Tokens>((resolve) => {
// 		// Make a POST request to the token refresh endpoint
// 		fetch(BACKEND_URL + "/auth/refresh", {
// 			method: "POST",
// 			headers: {
// 				Authorization: `Bearer ${rt}`,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((json) => resolve(json));
// 	});
// }

// Function to create a fetch function with the specified credentials
function makeFetch(
	path: string,
	method: MethodType = MethodType.GET,
	accessToken: string,
	init: RequestInit | undefined
): (newAccessToken?: string) => Promise<any> {
	return async function (newAccessToken?: string) {
		// Make a fetch request to the specified path with the provided or refreshed access token
		return fetch(`${BACKEND_URL}${path}`, {
			method: method,
			headers: {
				Authorization: `Bearer ${newAccessToken ?? accessToken}`,
			},
			...init,
		}).then((res) => res.json());
	};
}

export enum MethodType {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

import { getSession } from "next-auth/react";

export const customFetch = async (path: string, options = {}) => {
	const session = await getSession();
	console.log("session in customFetch: ", session);
	// if (!session) {
	// 	throw new Error("Unauthorization");
	// }
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	if (session?.user.accessToken) {
		headers.Authorization = `Bearer ${session.user.accessToken}`;
	}
	const url = BASE_URL + path;

	const response = await fetch(url, {
		...options,
		headers: {
			...headers,
			// ...options.headers!,
		},
	});

	console.log("custom fetch res: ", response);

	return response;
};

// export default customFetch;

import { createSafeActionClient } from "next-safe-action";
import { getSession } from "../auth";
import { prisma } from "../prisma";

export const actionClient = createSafeActionClient({
	handleReturnedServerError: (e) => {
		if (e instanceof Error) {
			return {
				serverError: e.message,
			};
		}

		return {
			serverError: "An unknown error occurred.",
		};
	},
});

export const authActionClient = actionClient.use(
	async ({ next, clientInput }) => {
		const session = await getSession();

		if (!session?.user.id) {
			throw new Error("Unauthorized: Login required.");
		}

		// @ts-ignore
		let workspaceId = clientInput?.workspaceId;

		if (!workspaceId) {
			throw new Error("WorkspaceId is required.");
		}

		workspaceId = workspaceId.replace("ws_", "");

		const workspace = await prisma.project.findUnique({
			where: {
				id: workspaceId,
			},
			include: {
				users: {
					where: {
						userId: session.user.id,
					},
					select: {
						role: true,
					},
				},
			},
		});

		if (!workspace || !workspace.users) {
			throw new Error("Workspace not found.");
		}

		return next({
			ctx: {
				user: session.user,
				workspace,
			},
		});
	}
);
