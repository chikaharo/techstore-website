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
import { Brand } from "../../list-brand/_components/Column";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface Props {
	brand: Brand;
}

const EditBrandForm = ({ brand }: Props) => {
	const formSchema = z.object({
		title: z.string().min(1, { message: "Email is required." }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: brand.title && brand.title,
		},
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			setLoading(true);
			const res = await axios.put(`/brand/${brand.id}`, values);
			console.log(res.data);
			if (res.data.status !== "success") {
				throw new Error("Edit Brand Failed");
			}
			router.refresh();
			router.push("/admin/list-brand");
			toast({ title: "Update New Brand Successfully" });
		} catch (error) {
			toast({
				title: error.message,
				variant: "destructive",
			});

			console.log("add brand error: ", error);
		}

		setLoading(false);
	};

	return (
		<div className="py-8 px-6 flex flex-col w-full">
			<div className="mb-4">
				<h1 className="font-bold text-2xl">Edit Brand</h1>
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
							Update
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default EditBrandForm;
