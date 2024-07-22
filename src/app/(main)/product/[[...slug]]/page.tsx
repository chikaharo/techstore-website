import MarkdownContent from "@/components/MarkdownContent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductAction from "@/components/ProductAction";
import ProductHeader from "@/components/ProductHeader";
import ProductSwiper from "@/components/ProductSwiper";
import SimilarProducts from "@/components/SimilarProducts";
import axios from "@/lib/axios";

const colors = ["Titan đen", "Titan xanh", "Trắng", "Hồng"];

const getProduct = async (slug: string) => {
	const res = await axios.get(`/product/${slug}`);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	console.log("get product data: ", res.data);

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data;
};

const getSimilarProducts = async (prodId: string) => {
	const res = await axios.get(`/product/similar?id=${prodId}`);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	console.log(res.data);

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data.products;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
	console.log({ slug: params.slug });
	const product = await getProduct(params.slug);
	const similarProducts = await getSimilarProducts(product._id);

	if (!product) {
		return <div>Product Not Found</div>;
	}

	return (
		<MaxWidthWrapper>
			<div className="flex h-full w-full flex-col">
				<ProductHeader title={product.title} />
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="w-full lg:w-2/3">
						<ProductSwiper product={product} />
					</div>
					<div className="w-full lg:w-1/3">
						<ProductAction product={product} />
					</div>
				</div>
				<div className="my-10">
					<SimilarProducts products={similarProducts} />
				</div>
				<div className="mt-10">
					<MarkdownContent content={product.description} />
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default ProductPage;
