import { PHONE_BRANDS } from "@/constants";
import ProductByCategory from "./ProductByCategory";
import { getPhoneProducts } from "@/lib/fetchServices";

export default async function PhoneProducts() {
	const phoneProducts = await getPhoneProducts();

	return (
		<ProductByCategory
			category="phone"
			tags={PHONE_BRANDS}
			products={phoneProducts}
		/>
	);
}
