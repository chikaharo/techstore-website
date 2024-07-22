import axios from "axios";

const instancee = axios.create({
	baseURL: "http://localhost:2222/api",
});

export default instancee;
