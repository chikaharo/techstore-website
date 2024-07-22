"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/OrderCard";
import { useToast } from "@/components/ui/use-toast";
import { headers } from "next/headers";

enum OrderStatus {
	Processing = "Processing",
	NotProcessed = "Not Processed",
	Delivering = "Delivering",
	Cancelled = "Cancelled",
	Delivered = "Delivered",
}

const OrderPage = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState<Order[]>([]);
	const [status, setStatus] = useState<string>("All");
	const { data: session } = useSession();
	const router = useRouter();
	const { toast } = useToast();

	const handleSelectChange = async (value: OrderStatus) => {
		console.log(value);
		setStatus(value);
	};

	const handlePayOrder = async (order: Order) => {
		setLoading(true);
		try {
			const orderData = {
				amount: order.totalAfterDiscount,
				info: `Thanh toan cho don hang: ${order._id}`,
			};
			const paymentRes = await axios.post("/payment", orderData);
			if (paymentRes.data.status !== "success") {
				throw new Error("Payment failed");
			}
			const paymentUrl = paymentRes.data.data;
			window.open(paymentUrl, "_blank");
			router.refresh();
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });

			console.log("add category error: ", error);
		}
		setLoading(false);
	};

	const handleCancelOrder = async (order: Order) => {
		setLoading(true);
		try {
			// console.log("Cancel Order");
			const res = await axios.put(
				`/order/cancel/${order._id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (res.data.status !== "success") {
				throw new Error("Cancel Order Failed");
			}
			router.refresh();
			toast({ title: "Cancel order successfully" });
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });

			console.log("cancel order error: ", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		const fetchOrders = async () => {
			if (!session || !session.user) {
				return router.push("/login");
			}
			try {
				setLoading(true);
				const res = await axios.get(`/order/user-orders?status=${status}`, {
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				});

				console.log("get orders data: ", res.data);
				if (res.data.status !== "success") {
					throw new Error("Get orders failed");
				}
				setOrders(res.data.data);
			} catch (error: any) {
				toast({
					title: error.message,
					variant: "destructive",
				});
				console.log("fetchOrder error:", error);
			}
			setLoading(false);
		};
		fetchOrders();
	}, [router, status]);

	return (
		<div className="flex w-full flex-col">
			<div className="flex items-center justify-between py-2 px-4">
				<h1 className="text-3xl font-bold ">Orders:</h1>
				<div className="w-[150px]">
					<Select
						onValueChange={handleSelectChange}
						disabled={loading}
						defaultValue=""
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a brand" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<>
									<SelectItem value="All">All</SelectItem>
									{Object.values(OrderStatus).map((key, idx) => (
										<SelectItem key={idx} value={key}>
											{key}
										</SelectItem>
									))}
								</>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex flex-col mt-4 w-full gap-2">
				{!loading && orders.length === 0 && (
					<div className="flex items-center justify-center my-8 text-xl text-slate-600 font-bold">
						You dont have a order yet
					</div>
				)}
				{!loading &&
					orders.length &&
					orders.map((od) => (
						<OrderCard
							key={od._id}
							order={od}
							loading={loading}
							handlePay={handlePayOrder}
							handleCancel={handleCancelOrder}
						/>
					))}
			</div>
		</div>
	);
};

export default OrderPage;
