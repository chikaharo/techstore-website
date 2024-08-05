import axios from "@/lib/axios";
import EditProductForm from "../_components/EditProductForm";

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
	const brands: Brand[] = await getBrands();
	const categories: Category[] = await getCategories();
	const colors: Color[] = await getColors();
	const product: Product = await getProduct(params.productId);
	console.log("edit product:", product);
	// console.log(params.productId);
	// if (!product) {
	// 	return <div>No Prodcut Found</div>;
	// }

	return (
		<div className="w-full min-h-screen">
			<EditProductForm
				brands={brands}
				categories={categories}
				colors={colors}
				product={product}
			/>
		</div>
	);
};

export default EditProductPage;
