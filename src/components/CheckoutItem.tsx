import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/helpers/formatCurrency";
import LoadingIndicator from "./ui/loading-indicator";
import { Loader2 } from "lucide-react";

interface Props {
	item: Cart;
	loading?: boolean;
	incre: (prodId: string, colorId: string) => void;
	decre: (prodId: string, colorId: string) => void;
	deleteCart: (prodId: string, colorId: string) => void;
}

const CheckoutItem = ({ item, loading, incre, decre, deleteCart }: Props) => {
	return (
		<div className="p-2 rounded-lg shadow-md">
			<div className="w-full grid grid-cols-5 gap-x-3">
				<div className="col-span-1">
					<AspectRatio ratio={1 / 1}>
						<Image
							src={item.product.thumbnail}
							alt="Image"
							className="rounded-md object-cover"
							fill
						/>
					</AspectRatio>
				</div>
				<div className="col-span-2 flex flex-col">
					<h3 className="font-bold">{item.product.title}</h3>
					<p className="text-slate-600 font-semibold">{item.color.title}</p>
					<div className="flex items-center font-bold text-red-600">
						{formatCurrency(item.product.price)}
					</div>
				</div>
				<div className="flex items-center justify-center gag-2 flex-shrink-0 flex-nowrap">
					<Button
						onClick={() => decre(item.product._id, item.color._id!)}
						variant="outline"
						disabled={loading}
					>
						{loading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<MinusIcon className="h-6 w-6" />
						)}
					</Button>
					<input
						className="p-2 w-12 h-8 text-center"
						disabled={true}
						value={item.quantity}
					/>
					<Button
						onClick={() => incre(item.product._id, item.color._id!)}
						variant="outline"
						disabled={loading}
					>
						{loading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<PlusIcon className="h-6 w-6" />
						)}
					</Button>
				</div>
				<div className="flex items-center justify-center">
					<Button
						onClick={() => deleteCart(item.product._id, item.color._id!)}
						variant="outline"
						disabled={loading}
					>
						{loading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<TrashIcon className="h-6 w-6 text-red-600" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutItem;
