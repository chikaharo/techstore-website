import Rating from "./Rating";
import { Separator } from "./ui/separator";

interface Props {
	title: string;
}

const ProductHeader = ({ title }: Props) => {
	return (
		<div className="flex flex-col w-full">
			<div className="flex w-full pt-2 pb-3 gap-x-2">
				<h1 className="text-xl font-bold text-slate-800">{title}</h1>
				<Rating />
			</div>
			<Separator className="my-4" />
		</div>
	);
};

export default ProductHeader;
