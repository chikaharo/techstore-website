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
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyPage = () => {
	const searchParams = useSearchParams();
	const emailParams = searchParams.get("email");
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const formSchema = z.object({
		email: z.string().min(1, { message: "Email is required." }),
		otp: z.string(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: emailParams || "",
			otp: "",
		},
	});
	const { toast } = useToast();

	if (!emailParams) {
		return router.push("/");
	}

	const resendOtp = async () => {
		try {
			const res = await axios.post("/user/verify-otp", {
				email: form.getValues("email"),
			});

			if (res.data.status !== "success") {
				throw new Error("resend otp error");
			}
			toast({ title: "Resend Otp success. Please check your email" });
		} catch (error: any) {
			toast({ title: "Resend Otp failed", variant: "destructive" });
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		console.log("submit verify: ", values);
		try {
			const res = await axios.post("/user/verify-otp", values);
			if (res.data.status !== "success") {
				throw new Error("Veriffy Otp failed");
			}
			router.refresh();
			router.push("/");
		} catch (error: any) {
			form.setError("otp", {
				type: "validate",
				message: "Otp is incorrect",
			});

			console.log("on Login error:", error);
			toast({
				title: "Verify otp failed",
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
				<div className="space-y-8 px-6 pt-24">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-slate-900 font-bold text-3xl">Verify OTP</h2>
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
					<div className="flex flex-col items-center">
						<FormField
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>OTP</FormLabel> */}
									<FormControl>
										{/* <Input
										className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter your email"
										{...field}
									/> */}
										<InputOTP
											maxLength={4}
											value={field.value}
											onChange={field.onChange}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
											</InputOTPGroup>
											{/* <InputOTPSeparator /> */}
											<InputOTPGroup>
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className="mt-4 font-semibold text-sm text-slate-600">
							Default OTP: 1768
						</p>
						<div className="flex items-center gap-x-2 mt-6">
							<p>Don't receive otp? </p>
							<span
								onClick={resendOtp}
								className="text-slate-800 font-bold cursor-pointer hover:text-slate-900 hover:underline"
							>
								Resend
							</span>
						</div>

						<Button
							className="mt-24"
							type="submit"
							variant="default"
							disabled={loading}
						>
							Submit
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default VerifyPage;
