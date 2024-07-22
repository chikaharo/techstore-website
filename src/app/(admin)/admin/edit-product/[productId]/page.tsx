import axios from "@/lib/axios";
import { RawBrand } from "../../list-brand/page";
import { RawCategory } from "../../list-category/page";
import { RawColor } from "../../list-color/page";
import { Brand } from "../../list-brand/_components/Column";
import { Category } from "../../list-category/_components/Column";
import { Color } from "../../list-color/_components/Column";
import { Product } from "../../list-product/_components/Column";
import EditProductForm from "../_components/EditProductForm";
import { RawProduct } from "../../list-product/page";

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

const getProduct = async (prodId: string) => {
	try {
		const res = await axios.get("/product/by-id/" + prodId);
		return res.data.data;
	} catch (error: any) {
		console.log("get Product error: ", error);
		throw new Error(error);
	}
};

const EditProductPage = async ({
	params,
}: {
	params: { productId: string };
}) => {
	const brands: RawBrand[] = await getBrands();
	const categories: RawCategory[] = await getCategories();
	const colors: RawColor[] = await getColors();
	const product: Product = await getProduct(params.productId);
	console.log("edit product:", product);
	// console.log(params.productId);
	// if (!product) {
	// 	return <div>No Prodcut Found</div>;
	// }

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
	const formattedProduct: Product = {
		...product,
		images: product.images.map((img) => ({
			public_id: img.public_id,
			url: img.url,
			asset_id: img.asset_id || null,
		})),
	};

	return (
		<div className="w-full min-h-screen">
			<EditProductForm
				brands={formattedBrands}
				categories={formattedCategories}
				colors={formattedColors}
				product={formattedProduct}
			/>
		</div>
	);
};

export default EditProductPage;
