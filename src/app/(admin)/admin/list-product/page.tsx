import axios from "@/lib/axios";
import ListProductClient from "./_components/ListProductClient";

export interface RawProduct extends Product {
	_id: string;
}

const getProducts = async () => {
	const res = await axios.get("/product");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data.products;
};

const ListProduct = async () => {
	const products: Product[] = await getProducts();
	if (!products) return <div>No products yet</div>;
	console.log({ products });
	return (
		<div className="flex flex-col w-full py-8 px-6">
			<div className="my-6">
				<h1 className="font-bold text-3xl">List Products</h1>
			</div>
			<ListProductClient products={products} />
		</div>
	);
};

export default ListProduct;
