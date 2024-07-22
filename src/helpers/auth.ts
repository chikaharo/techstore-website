"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FetchAuthProps {
	url: string;
	method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
	body?: { [key: string]: any };
}

export async function fetchAuth({
	url,
	method,
	body,
}: FetchAuthProps): Promise<{ ok: boolean; data: any }> {
	try {
		let accessToken = cookies().get("accessToken")?.value;
		const refreshToken = cookies().get("refreshToken")?.value;

		if (!accessToken || !refreshToken) {
			accessToken && cookies().delete("accessToken");
			refreshToken && cookies().delete("refreshToken");
			redirect("/login");
		}

		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
			method: method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			...(body && { body: JSON.stringify(body) }),
		});

		const responseData = await response.json();

		if (response.ok) return { ok: true, data: responseData };

		// Try to refresh access token and resend request if auth error
		if (responseData?.message === "Auth") {
			const refreshAccess = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
				{
					method: "POST",
				}
			);

			if (refreshAccess.ok) {
				accessToken = cookies().get("accessToken")?.value;

				const retry = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
					method: method,
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					...(body && { body: JSON.stringify(body) }),
				});

				const retryData = await retry.json();

				if (retry.ok) return { ok: true, data: retryData };

				// If again server return auth error redirect to login
				if (responseData?.message === "Auth") {
					cookies().delete("accessToken");
					cookies().delete("refreshToken");
					redirect("/login");
				}

				// Return error message
				return { ok: false, data: retryData };
			}
		}

		// Return error message
		return { ok: false, data: responseData };
	} catch (error) {
		// todo: handle error
		redirect("/login");
	}
}
