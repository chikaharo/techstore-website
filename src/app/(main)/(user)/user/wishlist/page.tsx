"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/OrderCard";
import { useToast } from "@/components/ui/use-toast";
import { headers } from "next/headers";
import WishlistProduct from "@/components/WishlistProduct";

enum OrderStatus {
	Processing = "Processing",
	NotProcessed = "Not Processed",
	Delivering = "Delivering",
	Cancelled = "Cancelled",
	Delivered = "Delivered",
}

const WishlistPage = () => {
	const [loading, setLoading] = useState(false);
	const [wishList, setWishlist] = useState<Product[]>([]);
	const { data: session } = useSession();
	const router = useRouter();
	const { toast } = useToast();

	const addToCart = async (prodId: string, colorId: string) => {
		if (!colorId) {
			toast({
				title: "Please choose an color",
				variant: "destructive",
			});
			return;
		}
		setLoading(true);
		try {
			const res = await axios.put(
				`/product/add-cart`,
				{ prodId, colorId },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error(res.data.message);
			}
			toast({
				variant: "default",
				title: "Add to Cart Successfully",
			});
		} catch (error: any) {
			toast({ title: "Add to Cart Failed", variant: "destructive" });
		}
		setLoading(false);
	};

	const removeFromWishlist = async (prodId: string) => {
		setLoading(true);
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
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast({
				title: error.message,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		const fetchWishlist = async () => {
			// if (!session || !session.user) {
			// 	return router.push("/login");
			// }
			try {
				setLoading(true);
				const res = await axios.get(`/user/wishlist`, {
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				});

				if (res.data.status !== "success") {
					throw new Error("Get wishlist error");
				}
				setWishlist(res.data.data);
			} catch (error: any) {
				console.log("fetch wisthlist error:", error);
			}
			setLoading(false);
		};
		fetchWishlist();
	}, []);

	return (
		<div className="flex w-full flex-col">
			<h1 className="tex-2xl font-bold text-slate-800">Wishlist</h1>
			{!loading && wishList.length && (
				<div className="flex flex-col gap-4 w-full mt-4">
					{wishList.map((prod) => (
						<WishlistProduct
							key={prod._id}
							product={prod}
							addToCart={addToCart}
							removeFromWishlist={removeFromWishlist}
							loading={loading}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default WishlistPage;
