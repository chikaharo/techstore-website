import axios from "@/lib/axios";
import { Color } from "./_components/Column";
import ListColorClient from "./_components/ListColorClient";

export interface RawColor {
	_id: string;
	title: string;
	value: string;
	createdAt: string;
}

const getColors = async () => {
	const res = await axios.get("/color");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.data) {
		// This will activate the closest `error.js` Error Boundary
		// throw new Error("Failed to fetch data");
	}

	return res.data.data;
};

const ListColor = async () => {
	const categories: RawColor[] = await getColors();
	if (!categories) return <div>No color yet</div>;
	const formattedColors: Color[] = categories.map((color) => ({
		id: color._id,
		title: color.title,
		value: color.value,
		createdAt: color.createdAt,
	}));
	return (
		<div className="flex flex-col w-full py-8 px-6">
			<div className="my-6">
				<h1 className="font-bold text-3xl">List Categories</h1>
			</div>
			<ListColorClient colors={formattedColors} />
		</div>
	);
};

export default ListColor;
