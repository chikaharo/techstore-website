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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Brand } from "../list-brand/_components/Column";
import { Category } from "../list-category/_components/Column";
import { Color } from "../list-color/_components/Column";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Dropzone from "react-dropzone";
import axios from "@/lib/axios";
import MultiSelect from "@/components/ui/multiple-select";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
	brands: Brand[];
	categories: Category[];
	colors: Color[];
}

interface Image {
	asset_id: string;
	public_id: string;
	url: string;
}

enum TagType {
	Special = "Special",
	Popular = "Popular",
	Featured = "Featured",
}

const AddProductForm = ({ brands, categories, colors }: Props) => {
	const [loading, setLoading] = useState(false);
	const [selectedImages, setSelectedImages] = useState<Image[]>([]);
	const router = useRouter();
	const formSchema = z.object({
		title: z.string().min(1, { message: "Product title is required." }),
		description: z.string().min(1, { message: "Description is required" }),
		price: z.number().min(1, { message: "Price is required" }),
		quantity: z.number().min(1, { message: "Quantity is required" }),
		category: z.string().min(1, { message: "Category is required" }),
		brand: z.string().min(1, { message: "Category is required" }),
		tags: z.nativeEnum(TagType),
		colors: z.array(z.string()).min(1, { message: "Color is required" }),
		images: z
			.array(
				z.object({
					asset_id: z.string(),
					public_id: z.string(),
					url: z.string(),
				})
			)
			.nullable(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			price: 0,
			quantity: 0,
			category: "",
			brand: "",
			tags: TagType.Featured,
			colors: [],
			images: [],
		},
	});

	const handleChangeMultipleSelect = (value: string) => {
		const colorsState = form.getValues("colors");
		console.log({ colorsState });
		if (!colorsState.includes(value)) {
			const updatedColors = [...colorsState, value];
			form.setValue("colors", updatedColors);
		} else {
			const updatedColors = [...colorsState];
			const indexOfItemToBeRemoved = colorsState.indexOf(value);
			updatedColors.splice(indexOfItemToBeRemoved, 1);
			form.setValue("colors", updatedColors);
		}
	};

	const handleImages = async (images: any) => {
		setLoading(true);
		console.log("handle Images: ", images);
		const formData = new FormData();
		for (let i = 0; i < images.length; i++) {
			formData.append("images", images[i]);
		}
		try {
			const res = await axios.post("/upload", formData);
			console.log("upload image ok: ", res.data);
			if (res.data.status !== "success") {
				throw new Error("Upload images failed");
			}
			const imagesState = form.getValues("images");
			// @ts-ignore
			form.setValue("images", [...imagesState, ...res.data]);
			setSelectedImages((prev) => [...prev, ...res.data]);
		} catch (error) {
			console.log("upload image failed: ", error);
		}
		setLoading(false);
	};

	const handleDeleteImage = (image: Image) => {
		const imagesState = form.getValues("images");
		const updatedImage = imagesState?.filter(
			(img) => img.public_id !== image.public_id
		);
		form.setValue("images", updatedImage!);
		setSelectedImages((prev) =>
			prev.filter((img) => img.public_id !== image.public_id)
		);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			setLoading(true);
			const newProduct = {
				...values,
				colors: values.colors.map((color) => ({ _id: color })),
			};
			const res = await axios.post("/product/", newProduct);
			console.log(res.data);
			router.refresh();
			router.push("/admin/list-product");
			toast("Create New Product Successfully", {
				className: "bg-green-600 ",
			});
		} catch (error) {
			toast("Create New Product Failed", {
				className: "bg-red-600 text-white",
			});

			console.log("add category error: ", error);
		}

		setLoading(false);
	};

	return (
		<div className="py-8 px-6 flex flex-col w-full">
			<div className="mb-4">
				<h1 className="font-bold text-2xl">Add Product</h1>
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
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter Product Title"
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
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>

								<FormControl>
									{/* <Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter Product Description"
										{...field}
										disabled={loading}
									/> */}
									<ReactQuill theme="snow" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>

								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter Product Price"
										{...field}
										onChange={(e) => field.onChange(+e.target.value)}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="brand"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Brand</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} disabled={loading}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a brand" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{!brands.length ? (
													<div className="h-8 w-full flex items-center justify-center">
														No brands yet
													</div>
												) : (
													<>
														<SelectLabel>Brands</SelectLabel>
														{brands.map((brand) => (
															<SelectItem key={brand.id} value={brand.title}>
																{brand.title}
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
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} disabled={loading}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{!categories.length ? (
													<div className="h-8 w-full flex items-center justify-center">
														No categories yet
													</div>
												) : (
													<>
														<SelectLabel>Categories</SelectLabel>
														{categories.map((category) => (
															<SelectItem
																key={category.id}
																value={category.title}
															>
																{category.title}
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
						name="tags"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tag</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} disabled={loading}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a tag" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Tags</SelectLabel>
												{Object.values(TagType).map((tag) => (
													<SelectItem
														key={tag}
														value={tag as string}
														className="capitalize"
													>
														{tag}
													</SelectItem>
												))}
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
						name="colors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>

								<FormControl>
									<MultiSelect
										values={colors}
										handleChange={(items: string) =>
											handleChangeMultipleSelect(items)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quanity</FormLabel>

								<FormControl>
									<Input
										className="bg-zinc-300/50 w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
										placeholder="Enter Product Quantity"
										{...field}
										onChange={(e) => field.onChange(+e.target.value)}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="bg-white border-1 p-12 text-center">
						<Dropzone
							disabled={loading}
							onDrop={(acceptedFiles) => handleImages(acceptedFiles)}
						>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<Input {...getInputProps({ multiple: true })} />
										<p>
											Drag 'n' drop some files here, or click to select files
										</p>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className="showimages flex flex-wrap gap-3">
						{selectedImages?.map((i) => (
							<div className=" relative flex" key={i.public_id}>
								<Image src={i.url} alt="" width={200} height={200} />
								<button
									type="button"
									onClick={() => handleDeleteImage(i)}
									className="bg-white rounded-md p-0.5 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 relative z-20"
									style={{ alignSelf: "start", size: "10px" }}
									width={10}
									height={10}
								>
									<span className="sr-only">Close menu</span>
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						))}
					</div>
					<div className="mt-4">
						<Button disabled={loading} type="submit" variant="default">
							{!loading ? (
								<>Create</>
							) : (
								<div>
									<svg
										className="animate-spin h-5 w-5 mr-3 ..."
										viewBox="0 0 24 24"
									></svg>
									Processing...
								</div>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddProductForm;
