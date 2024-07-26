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
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AddBard = () => {
	const formSchema = z.object({
		title: z.string().min(1, { message: "Email is required." }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});
	const [loading, setLoading] = useState(false);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const res = await axios.post("/brand/", values);
			toast("Create New Brand Successfully", {
				className: "bg-green-600 ",
			});
		} catch (error: any) {
			toast("Create New Brand Failed", {
				className: "bg-red-600 text-white",
			});

			console.log("add brand error: ", error);
		}

		setLoading(false);
	};

	return (
		<div className="py-8 px-6 flex flex-col w-full">
			<div className="mb-4">
				<h1 className="font-bold text-2xl">Add Brand</h1>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-8"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter Brand"
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-4">
						<Button disabled={loading} type="submit" variant="default">
							{loading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								"Create"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddBard;
