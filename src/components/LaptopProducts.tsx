import { PHONE_BRANDS } from "@/constants";
import ProductByCategory from "./ProductByCategory";
import { getLaptopProducts } from "@/lib/fetchServices";

export default async function LaptopProducts() {
	const laptopProducts = await getLaptopProducts();

	return (
		<ProductByCategory
			category="phone"
			tags={PHONE_BRANDS}
			products={laptopProducts}
		/>
	);
}
