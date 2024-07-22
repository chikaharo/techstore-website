import axios from "@/lib/axios";
import { format } from "date-fns";
import ListBrandClient from "./_components/ListBrandClient";

const getBrands = async () => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data;
};

const ListBrand = async () => {
	const brands: RawBrand[] = await getBrands();

	if (!brands) {
		return <div>No Brands found</div>;
	}
	const formattedBrands = brands.map((brand) => ({
		id: brand._id,
		title: brand.title,
		createdAt: format(brand.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className="py-8 px-6 flex flex-col w-full">
			<ListBrandClient brands={formattedBrands} />
		</div>
	);
};

export default ListBrand;

export type RawBrand = {
	_id: string;
	title: string;
	createdAt: string;
	updateAt: string;
};
