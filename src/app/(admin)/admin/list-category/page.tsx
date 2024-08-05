import axios from "@/lib/axios";
import ListCategoryClient from "./_components/ListCategoryClient";

const getCategories = async () => {
	const res = await axios.get("/category");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data;
};

const ListCategory = async () => {
	const categories: Category[] = await getCategories();
	if (!categories) return <div>No categories yet</div>;
	return (
		<div className="flex flex-col w-full py-8 px-6">
			<div className="my-6">
				<h1 className="font-bold text-3xl">List Categories</h1>
			</div>
			<ListCategoryClient categories={categories} />
		</div>
	);
};

export default ListCategory;
