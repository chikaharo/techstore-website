"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { formatCurrency } from "@/helpers/formatCurrency";
import { useToast } from "./ui/use-toast";

interface Props {
	total: number;
}

const CheckoutForm = ({ total }: Props) => {
	const { data: session } = useSession();
	const router = useRouter();
	const [provinceData, setProvinceData] = useState<IProvinceData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
				);
				console.log("response data: ", response);

				setProvinceData(response.data);
			} catch (error: any) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	const [districtsData, setDistrictsData] = useState<IDistrict[]>([]);
	const formSchema = z.object({
		name: z.string().min(1, { message: "Name is required." }),
		phone: z
			.string()
			.min(9, { message: "Phone is minimun 10 numbers." })
			.max(11, { message: "Phone is maxium 11 numbers." }),
		province: z.string().min(1, { message: "Province is required" }),
		district: z.string().min(1, { message: "District is required" }),
		address: z.string().min(1, { message: "Address is required" }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			province: "",
			district: "",
			address: "",
		},
	});
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);

		try {
			const data = {
				name: values.name,
				phone: values.phone,
				address: `${values.address}, ${values.district}, ${values.province}`,
			};
			const res = await axios.post("/order/", data, {
				headers: {
					Authorization: `Bearer ${session?.user?.accessToken}`,
					"Content-Type": "application/json",
				},
			});
			console.log(res.data);
			if (res.data.status !== "success") {
				throw new Error("Check out failed");
			}
			const order = res.data.data;
			const orderData = {
				amount: order.totalAfterDiscount,
				info: `Thanh toan cho don hang: ${order._id}`,
			};
			const paymentRes = await axios.post("/payment", orderData, {
				headers: {
					Authorization: `Bearer ${session?.user?.accessToken}`,
					"Content-Type": "application/json",
				},
			});
			if (paymentRes.data.status !== "success") {
				throw new Error("Check out failed");
			}
			const paymentUrl = paymentRes.data.data;
			window.open(paymentUrl, "_blank");
		} catch (error: any) {
			toast({
				title: error.message,
				variant: "destructive",
			});

			console.log("add category error: ", error);
		}

		setLoading(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
				);
				// const parsedData = await JSON.parse(response.data);
				// console.log({ parsedData });
				console.log("response data: ", response);

				setProvinceData(response.data);
			} catch (error: any) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log("province data: ", provinceData);
	}, [provinceData]);

	return (
		<div className="py-8 px-6 flex flex-col w-full bg-white">
			<div className="mb-4">
				<h1 className="font-bold text-2xl">Order Information</h1>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name:</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter name"
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone:</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter phone"
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="province"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Province</FormLabel>
									<FormControl>
										<Select
											onValueChange={(e) => {
												field.onChange(e);
												const districts = provinceData.filter(
													(province) => province.Name === e
												)[0].Districts;

												setDistrictsData(districts);
											}}
											disabled={loading}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a province" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{!provinceData ? (
														<div className="h-8 w-full flex items-center justify-center">
															No provinces yet
														</div>
													) : (
														<>
															<SelectLabel>Provinces</SelectLabel>
															{provinceData.map((province, idx) => (
																<SelectItem
																	key={province.Id}
																	value={province.Name}
																>
																	{province.Name}
																</SelectItem>
															))}
														</>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} disabled={loading}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a district" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{!form.getValues("province") ? (
														<div className="h-8 w-full flex items-center justify-center">
															No disctrict yet
														</div>
													) : (
														<>
															<SelectLabel>Districts</SelectLabel>
															{districtsData.map((district) => (
																<SelectItem
																	key={district.Id}
																	value={district.Name}
																>
																	{district.Name}
																</SelectItem>
															))}
														</>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address:</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter address"
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <div className="mt-4">
						<Button disabled={loading} type="submit" variant="default">
							Order
						</Button>
					</div> */}
					<div className="fixed left-0 bottom-20 lg:bottom-0 right-0 ">
						<MaxWidthWrapper className="h-[100px] p-4 bg-white border-t border-gray-300 shadow-md">
							<div className="w-full h-full flex items-center justify-between">
								<div className="flex items-center font-bold text-xl">
									<p className=" text-slate-800">Total (2 products): </p>
									<span className="text-red-600">{formatCurrency(total)}</span>
								</div>
								<Button type="submit" className="px-8">
									Checkout
								</Button>
							</div>
						</MaxWidthWrapper>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CheckoutForm;
