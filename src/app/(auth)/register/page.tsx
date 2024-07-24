"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import axios1 from "axios";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BigLogo from "@/../public/logo/big.png";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isCamelCase } from "@/helpers/isCamelCase";
import { useToast } from "@/components/ui/use-toast";

const RegisterPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const formSchema = z
		.object({
			email: z.string().min(1, { message: "Email is required." }),
			name: z.string().min(1, "Name is required"),
			password: z
				.string()
				.min(6, { message: "Password required at least 6 characters" })
				.refine(isCamelCase, {
					message:
						"Password must contain at least an upper letter, a number and a special character",
				}),
			password_confirmation: z
				.string()
				.min(6, { message: "Password required at least 6 characters" })
				.refine(isCamelCase, {
					message:
						"Password must contain at least an upper letter, a number and a special character",
				}),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: "Password don't match",
			path: ["password", "password_confirmation"],
		});
	// const formSchema = z.object({
	// 	email: z.string().min(1, { message: "Email is required." }),
	// 	name: z.string().min(1, "Name is required"),
	// 	password: z
	// 		.string()
	// 		.min(6, { message: "Password required at least 6 characters" })
	// 		.refine(isCamelCase, {
	// 			message:
	// 				"Password must contain at least an upper letter, a number and a special character",
	// 		}),
	// 	password_confirmation: z
	// 		.string()
	// 		.min(6, { message: "Password required at least 6 characters" })
	// 		.refine((val, ctx) => ctx.input.password === val, {
	// 			message: "Passwords do not match",
	// 			path: ["password_confirmation"],
	// 		})
	// 		.refine(isCamelCase, {
	// 			message:
	// 				"Password must contain at least an upper letter, a number and a special character",
	// 		}),
	// });
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			password_confirmation: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("onSubmit");
		setLoading(true);
		try {
			const data = {
				name: values.name,
				username: values.email,
				email: values.email,
				password: values.password,
				password_confirmation: values.password_confirmation,
			};
			const res = await axios.post("/user/register", data);
			console.log(res);
			router.push(`/verify?email=${res.data.data.email}`);
			if (res.data.status !== "success") {
				throw new Error("Register failed. Please try again");
			}
			toast({ title: "Register new account successfully" });
			router.push("/login");
		} catch (error: any) {
			console.log("on Login error:", error);
			toast({
				title: "Email or password incorrect. Please try again ",
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-3xl min-w-[450px] mx-auto"
			>
				<div className="space-y-8 px-6">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-slate-900 font-bold text-3xl">
							Register Techstore Member
						</h2>
						<div className="relative flex items-center w-36 md:w-44 lg:w-48 h-14 ">
							<Image
								src={BigLogo}
								alt="logo"
								// fill={true}
								style={{ objectFit: "contain" }}
								// layout="fill"
								height={150}
								width={320}
							/>
						</div>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter your name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter your password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password_confirmation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password Confirmation</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter your password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" variant="default" disabled={loading}>
						Register
					</Button>
					{/* <div className="flex items-center mt-5 h-[49px]">
						<hr className="h-[1px] w-full" />
						<p className="mx-2 whitespace-nowrap">Hoặc đăng nhập với</p>
						<hr className="h-[1px] w-full" />
					</div>
					<div className="flex items-center justify-center gap-[30px] h-[55px]">
						<div className="flex items-center gap-[10px]">
							<Image
								src="https://account.cellphones.com.vn/_nuxt/img/image45.93ceca6.png"
								alt=""
								width={24}
								height={24}
							/>
							<p>Google</p>
						</div>
						<div className="flex items-center gap-[10px]">
							<Image
								src="https://account.cellphones.com.vn/_nuxt/img/Logo-Zalo-Arc.a36365b.png"
								alt=""
								width={24}
								height={24}
							/>
							<p>Zalo</p>
						</div>
					</div> */}
				</div>
			</form>
		</Form>
	);
};

export default RegisterPage;
