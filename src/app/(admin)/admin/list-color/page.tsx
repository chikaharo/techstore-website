import axios from "@/lib/axios";
import ListColorClient from "./_components/ListColorClient";

export interface RawColor {
	_id: string;
	title: string;
	value: string;
	createdAt: string;
}

const getColors = async () => {
	const res = await axios.get("/color");

	if (!res.data) {
	}

	return res.data.data;
};

const ListColor = async () => {
	const colors: Color[] = await getColors();
	if (!colors) return <div>No color yet</div>;
	return (
		<div className="flex flex-col w-full py-8 px-6">
			<div className="my-6">
				<h1 className="font-bold text-3xl">List Colors</h1>
			</div>
			<ListColorClient colors={colors} />
		</div>
	);
};

export default ListColor;
