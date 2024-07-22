import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { formatCurrency } from "@/helpers/formatCurrency";
import Link from "next/link";
import { Button } from "./ui/button";
import { OrderStatus } from "@/types/global";

enum OrderStatus {
	Processing = "Processing",
	NotProcessed = "Not Processed",
	Delivering = "Delivering",
	Cancelled = "Cancelled",
	Delivered = "Delivered",
}

interface Props {
	order: Order;
	loading: boolean;
	handlePay: (od: Order) => void;
	handleCancel: (od: Order) => void;
}

const OrderCard = ({ order, loading, handleCancel, handlePay }: Props) => {
	return (
		<Card className="w-full my-4 mx-auto text-center">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<p className={cn("font-semibold text-slate-800-")}>
						Order: {order._id}
					</p>
					<div className="text-xl font-bold text-slate-600 uppercase">
						{order.orderStatus}
					</div>
				</CardTitle>
			</CardHeader>
			<Separator className="my-4" />
			<CardContent className="flex flex-col">
				{order.products.map((prod, idx) => (
					<div
						key={idx}
						className="w-full flex items-center justify-between py-4 pb-8 px-2 border-b-2 border-gray-300"
					>
						<div className="flex gap-x-2">
							<div className="bg-muted w-[100px] h-auto relative">
								<AspectRatio>
									<Image
										src={prod.product.thumbnail}
										alt="product thumbnail"
										fill
										className="rounded-md object-cover"
									/>
								</AspectRatio>
							</div>
							<div className="flex flex-col gap-4 items-start">
								<Link
									href={`/product/${prod.product.slug}`}
									className="text-xl font-bold max-w-xl text-start"
								>
									{prod.product.title}
								</Link>
								<p className="text-sm font-semibold text-slate-600">
									{prod.color.title} x {prod.quantity}
								</p>
							</div>
						</div>
						<div className="flex items-center font-bold text-red-600">
							{formatCurrency(prod.product.price)}
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>Detail information</AccordionTrigger>
						<AccordionContent className="w-full grid grid-cols-4 gap-x-6 gap-y-2 text-slate-699 text-sm justify-items-start">
							<div>Name:</div>
							<div className="col-span-3"> {order.name}</div>
							<div>Phone:</div>
							<div className="col-span-3"> {order.phone}</div>
							<div>Address:</div>
							<div className="col-span-3"> {order.address}</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				{order.orderStatus === OrderStatus.NotProcessed && (
					<div className="mt-4 w-full flex gap-2 justify-end items-center">
						<Button disabled={loading} onClick={() => handlePay(order)}>
							Pay now
						</Button>
						<Button
							disabled={loading}
							onClick={() => handleCancel(order)}
							variant="destructive"
						>
							Cancel
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
};

export default OrderCard;
