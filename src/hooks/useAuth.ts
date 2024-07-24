import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";
import { redirect } from "next/navigation";

export const useAuth = () => {
	const { data, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/login");
		},
	});

	if (status !== "loading") {
		console.log("status in useAuth: ", status);
		if (status === "authenticated") {
			setAuthToken(data.user.accessToken);
		} else {
			setAuthToken("");
		}
	}

	return {
		session: data,
		loading: status === "loading",
		isAuthenticated: status === "authenticated",
	};
};

const setAuthToken = (token: string) => {
	if (!!token) {
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common["Authorization"];
	}
};
