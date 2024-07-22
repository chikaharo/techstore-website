import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { Brand } from "../../list-brand/_components/Column";
import EditCategoryForm from "./EditCategoryForm";

const getCategoryData = async (id: string) => {
	try {
		const res = await axios.get(`/category/${id}`);
		console.log(res.data);
		return res.data.data;
	} catch (error) {
		console.log(error);
		// throw new Error("Failed to get Brand Data");
	}
};

const EditCategory = async ({ params }: { params: { categoryId: string } }) => {
	const { categoryId } = params;
	console.log(categoryId);
	const category = await getCategoryData(categoryId as string);
	if (!category) {
		return <div>Category is not found</div>;
	}
	const formattedCategory: Brand = {
		id: category._id,
		title: category.title,
		createdAt: category.createdAt,
	};
	return (
		<div className="w-full min-h-screen">
			<EditCategoryForm category={formattedCategory} />
		</div>
	);
};

export default EditCategory;
