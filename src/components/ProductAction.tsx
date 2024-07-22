"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

interface Color {
	_id: string;
	title: string;
	value: string;
	createdAt: string;
}

interface Props {
	product: Product;
}

const ProductAction = ({ product }: Props) => {
	const [selectedColor, setSelectedColor] = useState("");
	const { data: session } = useSession();
	const { toast } = useToast();

	const addToCart = async () => {
		if (!session || !session.user) {
			return redirect("/login");
		}
		if (!selectedColor) {
			toast({ title: "Please select a color", variant: "destructive" });
			return;
		}
		try {
			const res = await axios.put(
				`/product/add-cart`,
				{ prodId: product._id, colorId: selectedColor },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Add to Cart Failed");
			}
			toast({
				variant: "default",
				title: "Add to Cart Successfully",
			});
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });
		}
	};

	const handleCheckout = () => {};

	return (
		<div className="flex flex-col w-full">
			<p className="font-semibold text-slate-700">Choose a color</p>
			<div className="grid grid-cols-3  items-center gap-2 mt-2">
				{product.colors.map((color, idx) => (
					<div
						key={color._id}
						onClick={() => setSelectedColor(color._id)}
						className={cn(
							"w-full flex itemsc-enter justify-center p-2 bg-transparent border-gray-300 border cursor-pointer",
							selectedColor === color._id &&
								"ring-indigo-600 ring-offset-1 border-indigo-600"
						)}
					>
						{color.title}
					</div>
				))}
			</div>
			<div className="grid grid-cols-4 items-center my-4">
				<p className="font-semibold text-gray-700">Giá chỉ từ:</p>
				<p className="col-span-3 text-2xl text-red-600 font-bold">
					27.990.000 đ
				</p>
				<div></div>
				<p className="col-span-3 text-gray-700 font-bold line-through ">
					30.990.000 đ
				</p>
			</div>
			<div className="flex items-center gap-2">
				<Button className="flex-1 font-bold" onClick={handleCheckout}>
					BUY
				</Button>
				<Button
					className="text-xs items-center justify-center gap-2"
					variant={"outline"}
					onClick={addToCart}
				>
					<ShoppingCartIcon className="h-6 w-6" />
					<p>Add to Cart</p>
				</Button>
			</div>
		</div>
	);
};

export default ProductAction;
