/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		domains: [
			"fptshop.com.vn",
			"cdn.dienthoaigiakho.vn",
			"account.cellphones.com.vn",
			"res.cloudinary.com",
			"cdn2.cellphones.com.vn",
		],
	},
};

export default nextConfig;
