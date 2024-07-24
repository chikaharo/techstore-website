import axios from "axios";
import { auth } from "@/auth";

const baseURL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:2222/api";

const instance = axios.create({
	baseURL: baseURL,
});

instance.interceptors.request.use(async (request) => {
	const session = await auth();

	console.log("axios session: ", session);
	if (session) {
		request.headers.Authorization = `Bearer ${session.user.accessToken}`;
	}
	return request;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(`error`, error);
		return error;
	}
);

export default instance;
