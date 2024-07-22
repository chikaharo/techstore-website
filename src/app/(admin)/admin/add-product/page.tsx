import axios from "@/lib/axios";
import AddProductForm from "./AddProductForm";
import { RawBrand } from "../list-brand/page";
import { RawCategory } from "../list-category/page";
import { RawColor } from "../list-color/page";
import { Brand } from "../list-brand/_components/Column";
import { Category } from "../list-category/_components/Column";
import { Color } from "../list-color/_components/Column";
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
	const brands: RawBrand[] = await getBrands();
	const categories: RawCategory[] = await getCategories();
	const colors: RawColor[] = await getColors();
	const formattedBrands: Brand[] = brands.map((brand) => ({
		id: brand._id,
		title: brand.title,
		createdAt: brand.createdAt,
	}));
	const formattedCategories: Category[] = categories.map((category) => ({
		id: category._id,
		title: category.title,
		createdAt: category.createdAt,
	}));
	const formattedColors: Color[] = colors.map((color) => ({
		id: color._id,
		title: color.title,
		value: color.value,
		createdAt: color.createdAt,
	}));

	return (
		<div className="w-full min-h-screen">
			<AddProductFormWithNoSSR
				brands={formattedBrands}
				categories={formattedCategories}
				colors={formattedColors}
			/>
		</div>
	);
};

export default AddProductPage;
