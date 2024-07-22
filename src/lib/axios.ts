import axios from "axios";

const instancee = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default instancee;
