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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BigLogo from "@/../public/logo/big.png";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();
	const formSchema = z.object({
		email: z.string().min(1, { message: "Email is required." }),
		password: z
			.string()
			.min(6, { message: "Password required at least 6 characters" }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { toast } = useToast();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			// const res = await axios.post("/user/login/password", values);
			const res = await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password,
				values,
			});
			console.log(res);

			if (!res?.ok) {
				throw new Error("Login failed. Please try again");
			}
			router.refresh();
			router.push("/");
			// const res1 = await axios.get("/user/hello", {
			// 	withCredentials: true,
			// });
			// console.log("response after: ", res1.data);
			// router.push("/");
		} catch (error: any) {
			form.setError("email", {
				type: "validate",
				message: "Email or password incorrect",
			});
			form.setError("password", {
				type: "validate",
				message: "Email or password incorrect",
			});
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
							Login Techstore Member
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
							</FormItem>
						)}
					/>
					<Button type="submit" variant="default" disabled={loading}>
						Log In
					</Button>
					<div className="my-4 flex items-center justify-end px-4 gap-x-2">
						<p className="font-semibold text-slate-600">
							Dont have an account?
						</p>
						<Link
							className="text-sky-600 hover:text-sky-500 hover:underline"
							href="/register"
						>
							Register Now
						</Link>
					</div>
					<div className="flex items-center mt-5 h-[49px]">
						<hr className="h-[1px] w-full" />
						<p className="mx-2 whitespace-nowrap">Login with</p>
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
					</div>
				</div>
			</form>
		</Form>
	);
};

export default LoginPage;
