import axios from "@/lib/axios";
import AddProductForm from "./AddProductForm";
import dynamic from "next/dynamic";

const AddProductFormWithNoSSR = dynamic(() => import("./AddProductForm"), {
	ssr: false,
});

const getBrands = async () => {
	const res = await axios.get("/brand");

	if (!res.data) {
	}

	return res.data.data;
};
const getCategories = async () => {
	const res = await axios.get("/category");

	if (!res.data) {
	}

	return res.data.data;
};
const getColors = async () => {
	const res = await axios.get("/color");

	if (!res.data) {
	}

	return res.data.data;
};

const AddProductPage = async () => {
	const brands: Brand[] = await getBrands();
	const categories: Category[] = await getCategories();
	const colors: Color[] = await getColors();
	const formattedBrands: Brand[] = brands.map((brand) => ({
		id: brand._id,
		title: brand.title,
		createdAt: brand.createdAt,
	}));

	return (
		<div className="w-full min-h-screen">
			<AddProductFormWithNoSSR
				brands={brands}
				categories={categories}
				colors={colors}
			/>
		</div>
	);
};

export default AddProductPage;
