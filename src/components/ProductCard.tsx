"use client";
import { Product } from "@/app/(admin)/admin/list-product/_components/Column";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button } from "./ui/button";
import Rating from "./Rating";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { formatCurrency } from "@/helpers/formatCurrency";
import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface Props {
	className?: string;
	data: Product;
}

const ProductCard = ({ className, data }: Props) => {
	const { toast } = useToast();
	const { data: session } = useSession();

	const handleAddWishlist = async (prodId: string) => {
		try {
			const res = await axios.put(
				"/product/wishlist",
				{
					prodId,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.user.accessToken}`,
					},
				}
			);
			if (res.data.status !== "success") {
				throw new Error(res.data.message);
			}
			toast({
				title: res.data.message,
			});
		} catch (error) {
			console.log(error);
			toast({
				title: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<Card className={cn("", className)}>
			<Link href={`/product/${data.slug}`}>
				<AspectRatio ratio={1 / 1}>
					<Image
						src={data.images[0].url}
						alt="Image"
						fill
						className="rounded-md object-cover"
					/>
				</AspectRatio>
				<CardContent className="mt-2">
					<CardTitle className="text-sm">{data.title}</CardTitle>
					<div className="flex flex-col lg:flex-row items-start gap-x-1">
						<span className="text-red-600 font-semibold text-sm">
							{formatCurrency(+data.price)}
						</span>
						<span className="text-slate-700 text-xs line-through">
							{formatCurrency(+data.price * 1.3)}
						</span>
					</div>
				</CardContent>
			</Link>
			<CardFooter>
				<div className="flex w-full items-center justify-between">
					<div>
						<Rating />
					</div>
					<div className="flex items-center gap-x-1">
						<span className="text-xs text-gray-600"></span>
						<HeartIcon
							className="text-red-600 h-6 w-6 cursor-pointer hover:scale-110"
							onClick={() => handleAddWishlist(data._id)}
						/>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};
export default ProductCard;
