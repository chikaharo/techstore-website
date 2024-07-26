"use client";
import { cn } from "@/lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { formatCurrency } from "@/helpers/formatCurrency";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Loader2, Trash } from "lucide-react";

enum OrderStatus {
	Processing = "Processing",
	NotProcessed = "Not Processed",
	Delivering = "Delivering",
	Cancelled = "Cancelled",
	Delivered = "Delivered",
}

interface Props {
	loading: boolean;
	product: Product;
	addToCart: (productId: string, colorId: string) => void;
	removeFromWishlist: (productId: string) => void;
}

const WishlistProduct = ({
	loading,
	product,
	addToCart,
	removeFromWishlist,
}: Props) => {
	const [selectedColor, setSelectedColor] = useState("");

	return (
		<div className="w-full p-4 py-6 flex items-center justify-between border border-gray-300 shadow-md">
			<div className="flex items-center gap-x-2 md:gap-x-4">
				<div className="bg-muted w-[100px] h-auto relative">
					<AspectRatio>
						<Image
							src={product.thumbnail}
							alt="Image"
							fill
							className="rounded-md object-cover"
						/>
					</AspectRatio>
				</div>
				<div className="flex flex-col items-start">
					<Link
						href={`/product/${product.slug}`}
						className="text-xl font-bold max-w-xl text-start"
					>
						{product.title}
					</Link>
					<div className="flex items-center font-bold text-red-600 mt-2">
						{formatCurrency(product.price)}
					</div>
					<div className="grid grid-cols-4 items-center gap-2 mt-2">
						{product.colors.map((color, idx) => (
							<div
								key={color._id}
								onClick={() => setSelectedColor(color._id)}
								className={cn(
									"w-full flex itemsc-enter justify-center p-1 bg-transparent border-gray-300 border cursor-pointer text-xs h-12 overflow-hidden text-ellipsis items-center",
									selectedColor === color._id &&
										"ring-indigo-600 ring-offset-1 border-indigo-600"
								)}
							>
								{color.title}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-center gap-2">
				<Button
					variant={"outline"}
					onClick={() => addToCart(product._id, selectedColor)}
					disabled={loading}
				>
					{loading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<div>
							<ShoppingCartIcon className="h-6 w-6" />
							<p>Add to Cart</p>
						</div>
					)}
				</Button>
				<Button
					className="text-xs items-center justify-center gap-2"
					variant={"destructive"}
					onClick={() => removeFromWishlist(product._id)}
					disabled={loading}
				>
					{loading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<div className="text-xs items-center justify-center gap-2">
							<Trash className="h-6 w-6" />
							<p>Remove</p>
						</div>
					)}
				</Button>
			</div>
		</div>
	);
};

export default WishlistProduct;
