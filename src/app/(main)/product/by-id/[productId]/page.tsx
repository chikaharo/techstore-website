import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductAction from "@/components/ProductAction";
import ProductHeader from "@/components/ProductHeader";
import ProductSwiper from "@/components/ProductSwiper";
import axios from "@/lib/axios";

const colors = ["Titan đen", "Titan xanh", "Trắng", "Hồng"];

const getProduct = async (id: string) => {
	const res = await axios.get(`http://localhost:2222/api/product/by-id/${id}`);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data;
};

const addToCart = async () => {
	const res = await axios.put(`http://localhost:2222/api/product/add-cart`);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data;
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const product = await getProduct(params.productId);
	console.log({ product });
	// const test = await addToCart();

	if (!product) {
		return <div>Product Not Found</div>;
	}

	return (
		<MaxWidthWrapper>
			<div className="flex h-full w-full flex-col">
				<ProductHeader title={product.title} />
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="w-full lg:w-2/3">
						<ProductSwiper prodId={product._id} />
					</div>
					<div className="w-full lg:w-1/3">
						<ProductAction product={product} />
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default ProductPage;
