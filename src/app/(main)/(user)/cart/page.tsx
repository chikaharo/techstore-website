"use client";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutItem from "@/components/CheckoutItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import TotalCheckout from "@/components/TotalCheckout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const CartPage = () => {
	const { data: session } = useSession();
	const [cartData, setCartData] = useState<Cart[]>([]);
	const [loading, setLoading] = useState(false);
	const totalPrice = cartData.reduce((acc, cur) => {
		return (acc += cur.product.price * cur.quantity);
	}, 0);
	const { toast } = useToast();

	const handleAdd = async (productId: string, color: string) => {
		setLoading(true);

		try {
			const res = await axios.put(
				`/product/add-cart`,
				{ prodId: productId, colorId: color },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Add to cart failed");
			}
			getData();
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });
			console.log("handleAdd error:", error);
		}

		setLoading(false);
	};

	const handleMinus = async (productId: string, color: string) => {
		setLoading(true);
		try {
			const res = await axios.put(
				`/product/remove-cart`,
				{ prodId: productId, colorId: color },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Minus from cart failed");
			}
			getData();
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });

			console.log("handleMinus error:", error);
		}
		setLoading(false);
	};

	const handleDelete = async (productId: string, color: string) => {
		setLoading(true);
		try {
			const res = await axios.post(
				`/product/delete-cart`,
				{ prodId: productId, colorId: color },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Minus from cart failed");
			}
			getData();
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });

			console.log("handleDelete error:", error);
		}
		setLoading(false);
	};

	const getData = useCallback(async () => {
		try {
			const res = await axios.get("/product/cart", {
				headers: {
					Authorization: `Bearer ${session?.user.accessToken}`,
					"Content-Type": "application/json",
				},
			});
			console.log("cart page data:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Get Cart Data failed");
			}
			setCartData(res.data.data);
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });

			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (session && session.user) {
			getData();
		}
	}, [session, session?.user, getData]);

	return (
		<MaxWidthWrapper>
			<div className="flex flex-col lg:flex-row gap-6 py-8 pb-28">
				<div className="w-full lg:w-2/3 flex h-full flex-col  relative">
					<h1 className="text-2xl font-bold">
						Your Cart ({cartData?.length || 0})
					</h1>
					<ScrollArea className="h-48 w-full lg:h-screen">
						<div className="flex flex-col gap-4">
							{cartData.map((cart, idx) => (
								<CheckoutItem
									key={idx}
									item={cart}
									loading={loading}
									incre={handleAdd}
									decre={handleMinus}
									deleteCart={handleDelete}
								/>
							))}
						</div>
					</ScrollArea>

					<div className="">{/* <TotalCheckout total={totalPrice} /> */}</div>
				</div>
				<div className="w-full lg:w-1/3">
					<CheckoutForm total={totalPrice} />
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default CartPage;
