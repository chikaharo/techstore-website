import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import EditBrandForm from "./EditBrandForm";
import { Brand } from "../../list-brand/_components/Column";

const getBrandData = async (id: string) => {
	try {
		const res = await axios.get(`/brand/${id}`);
		console.log(res.data);
		return res.data.data;
	} catch (error) {
		console.log(error);
		// throw new Error("Failed to get Brand Data");
	}
};

const EditBrand = async ({ params }: { params: { brandId: string } }) => {
	const { brandId } = params;
	console.log(brandId);
	const brand = await getBrandData(brandId as string);
	if (!brand) {
		return <div>Brand is not found</div>;
	}
	const formattedBrand: Brand = {
		id: brand._id,
		title: brand.title,
		createdAt: brand.createdAt,
	};
	return (
		<div className="w-full min-h-screen">
			<EditBrandForm brand={formattedBrand} />
		</div>
	);
};

export default EditBrand;
