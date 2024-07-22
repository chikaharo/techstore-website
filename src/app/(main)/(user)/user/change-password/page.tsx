"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { isCamelCase } from "@/helpers/isCamelCase";

const ProfilePage = () => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState();
	const formSchema = z.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 charaters." })
			.refine(isCamelCase, {
				message:
					"Password must contain at least an upper letter, a number and a special character",
			}),
		password_confirmation: z
			.string()
			.min(1, { message: "Password required." })
			.refine(isCamelCase, {
				message:
					"Password must contain at least an upper letter, a number and a special character",
			}),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			password_confirmation: "",
		},
	});
	const { toast } = useToast();
	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const res = await axios.put("/user/change-password", values, {
				headers: {
					Authorization: `Bearer ${session?.user?.accessToken}`,
				},
			});

			if (res.data.status !== "success") {
				throw new Error("Update Password failed");
			}
			toast({ title: "Update Password Successfully" });
		} catch (error: any) {
			toast({ title: "Update Password Failed", variant: "destructive" });

			console.log("add category error: ", error);
		}

		setLoading(false);
	};

	return (
		<div className="flex w-full h-screen flex-col px-8 lg:px-20 bg-white">
			<div className="py-8 px-6 flex flex-col w-full">
				<div className="mb-4">
					<h1 className="font-bold text-2xl">Change Your Password</h1>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col space-y-8"
					>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password:</FormLabel>

									<FormControl>
										<Input
											type="password"
											className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
											placeholder="Enter Category"
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
							name="password_confirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password confirmation:</FormLabel>

									<FormControl>
										<Input
											type="password"
											className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
											placeholder="Enter Category"
											{...field}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex w-full items-center justify-end mt-4">
							<Button disabled={loading} type="submit" variant="default">
								Change Password
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ProfilePage;
