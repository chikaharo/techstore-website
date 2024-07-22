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
import { GetColorName } from "hex-color-to-color-name";

const AddColor = () => {
	const formSchema = z.object({
		title: z.string().min(1, { message: "Category title is required." }),
		value: z.string().min(1, { message: "Color is required" }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: GetColorName("#000000"),
			value: "#000000",
		},
	});
	const [loading, setLoading] = useState(false);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			setLoading(true);
			const res = await axios.post("/color/", values);
			console.log(res.data);
			toast("Create New Color Successfully", {
				className: "bg-green-600 ",
			});
		} catch (error) {
			toast("Create New Color Failed", {
				className: "bg-red-600 text-white",
			});

			console.log("add color error: ", error);
		}

		setLoading(false);
	};

	const onTest = () => {
		form.setValue("title", "Test Value ");
	};

	return (
		<div className="py-8 px-6 flex flex-col w-full">
			<div className="mb-4">
				<h1 className="font-bold text-2xl">Add Color</h1>
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
										placeholder="Enter Color Title"
										{...field}
										disabled={true}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="value"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										// className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										// placeholder="Enter Category"
										type="color"
										{...field}
										onChange={(e) => {
											console.log(GetColorName(e.target.value));
											form.setValue("title", GetColorName(e.target.value));
											field.onChange(e);
										}}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-4">
						<Button disabled={loading} type="submit" variant="default">
							Create
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddColor;
