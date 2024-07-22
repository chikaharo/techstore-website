"use server";
import Banner from "@/components/Banner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductByCategory, { Tag } from "@/components/ProductByCategory";
import axios from "@/lib/axios";

const phoneBrandTags: Tag[] = [
	{ title: "Apple", url: "/products?category=phone&brand=Apple" },
	{ title: "Samsung", url: "/products?category=phone&brand=Samsung" },
	{ title: "Huawei", url: "/products?category=phone&brand=Huawei" },
	{ title: "Xiaomi", url: "/products?category=phone&brand=Xiaomi" },
	{ title: "OPPO", url: "#" },
	{ title: "Vivo", url: "#" },
	{ title: "Realme", url: "#" },
	{ title: "Nokia", url: "#" },
	{ title: "HTC", url: "#" },
	{ title: "ASUS", url: "#" },
	{ title: "Vsmart", url: "#" },
];
const laptopBrandTags: Tag[] = [
	{ title: "Asus", url: "#" },
	{ title: "Acer", url: "#" },
	{ title: "Lenovo", url: "#" },
	{ title: "Dell", url: "#" },
	{ title: "HP", url: "#" },
	{ title: "Apple", url: "#" },
	{ title: "Microsoft", url: "#" },
	{ title: "Alienware", url: "#" },
];

const getPhoneProducts = async () => {
	const res = await axios.get(
		"http://localhost:2222/api/product?category=phone"
	);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data.products;
};
const getLaptopProducts = async () => {
	const res = await axios.get(
		"http://localhost:2222/api/product?category=laptop"
	);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data.products;
};

export default async function Home() {
	const phoneProducts = await getPhoneProducts();
	const laptopProducts = await getLaptopProducts();
	console.log({ phoneProducts });

	return (
		<div className="flex flex-col min-h-screen">
			<MaxWidthWrapper className="pb-24 sm:pb-32 xl:pb-52 pt-10 lg:pt-24 xl:pt-10 lg:gap-x-0 xl:gap-x-8 flex flex-col">
				<ProductByCategory
					category="phone"
					tags={phoneBrandTags}
					products={phoneProducts}
				/>
				<ProductByCategory
					category="laptop"
					tags={laptopBrandTags}
					products={laptopProducts}
				/>
			</MaxWidthWrapper>
		</div>
	);
}
