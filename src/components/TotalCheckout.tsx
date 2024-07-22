import { formatCurrency } from "@/helpers/formatCurrency";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";

interface Props {
	total: number;
}

const TotalCheckout = ({ total }: Props) => {
	return (
		<div className="fixed left-0 bottom-0 right-0 ">
			<MaxWidthWrapper className="h-[100px] p-4 bg-white border-t border-gray-300 shadow-md">
				<div className="w-full h-full flex items-center justify-between">
					<div className="flex items-center font-bold text-xl">
						<p className=" text-slate-800">Total (2 products): </p>
						<span className="text-red-600">{formatCurrency(total)}</span>
					</div>
					<Button className="px-8">Checkout</Button>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default TotalCheckout;
