"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Slider } from "@/components/ui/slider";
import axios from "@/lib/axios";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";

const categories = [
	{
		title: "Phone",
		value: "phone",
	},
	{
		title: "Laptop",
		value: "laptop",
	},
	{
		title: "TV",
		value: "tv",
	},
	{
		title: "Head phone",
		value: "head phone",
	},
];

const brands = [
	{ title: "Apple", url: "#" },
	{ title: "Samsung", url: "#" },
	{ title: "Huawei", url: "#" },
	{ title: "Xiaomi", url: "#" },
	{ title: "OPPO", url: "#" },
	{ title: "Vivo", url: "#" },
	{ title: "Realme", url: "#" },
	{ title: "Nokia", url: "#" },
	{ title: "HTC", url: "#" },
	{ title: "ASUS", url: "#" },
	{ title: "Vsmart", url: "#" },
];

const PRICE_FILTERS = [
	{ value: [0, 1000000000], title: "Any price" },
	{ value: [0, 500000], title: "Less than 5 Millions" },
	{ value: [0, 10000000], title: "5 to 10 Millions" },
	{ value: [0, 20000000], title: "10 to 20 Millions" },
	{ value: [20000000, 100000000], title: "More than 20 Millions" },
];

const DEFAULT_PRICE = [0, 100000000];

const SORT_OPTIONS = [
	{ name: "None", value: "" },
	{ name: "Price: Low to High", value: "price" },
	{ name: "Price: High to Low", value: "-price" },
	{ name: "Sold: Most", value: "-sold" },
	{ name: "Sold: Less", value: "sold" },
] as const;

const LIMIT_PER_PAGE = 10;

const ProductsPage = () => {
	const searchParams = useSearchParams();
	const queryObj = Object.fromEntries(searchParams.entries());
	const queryStr = qs.stringify(Object.fromEntries(searchParams.entries()));
	const defaultTitle = searchParams.get("title");
	const deafaultCategory = searchParams.get("category");
	const deafaultBrand = searchParams.get("brand");

	const [filters, setFilters] = useState<IFilters>({
		title: defaultTitle || "",
		category: deafaultCategory || "",
		brand: deafaultBrand ? [deafaultBrand] : [],
		sort: "",
		price: {
			title: "",
			value: [0, 100000000],
		},
		page: 1,
	});
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	// const [page, setPage] = useState(1);
	const [countPages, setCountPages] = useState(0);
	const { toast } = useToast();

	const minPrice = Math.min(filters.price.value[0], filters.price.value[1]);
	const maxPrice = Math.max(filters.price.value[0], filters.price.value[1]);

	const applyArrayFilter = (cat: string, value: string) => {
		const isFilterApplied = filters[cat].findIndex((item) => item === value);

		if (isFilterApplied !== -1) {
			setFilters((prev) => ({
				...prev,
				[cat]: prev[cat].filter((v) => v !== value),
			}));
		} else {
			setFilters((prev) => ({
				...prev,
				[cat]: [...prev[cat], value],
			}));
		}
	};

	const applyChangePage = (page: number) => {
		if (page <= 0 || page > countPages) {
			return;
		}
		setFilters((prev) => ({ ...prev, page }));
	};

	const getProducts = async () => {
		setLoading(true);
		try {
			const query = {
				...filters,
			};
			delete query.price;
			const queryString = qs.stringify(query);

			console.log({ queryString });

			const res = await axios.get(
				`/product?${queryString}&price[gte]=${filters.price.value[0]}&price[lte]=${filters.price.value[1]}`
			);
			console.log("filter products: ", res.data);
			if (res.data.status !== "success") {
				throw new Error("Get Products Failed");
			}
			setProducts(res.data.data.products);
			const count = Math.floor(res.data.data.count / LIMIT_PER_PAGE) + 1;
			setCountPages(count);
		} catch (error) {
			console.log(error);
			toast({
				title: error?.message,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		console.log({ filters });
		getProducts();
	}, [filters]);

	return (
		// <MaxWidthWrapper className="">
		<div className="flex pb-6 pt-12">
			<div className="flex min-w-[200px] md:min-w-[250px] flex-col px-4 lg:px-8 flex-shrink-0">
				<ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-slate-800">
					{categories.map((cat, idx) => (
						<li key={idx} className="">
							<Link
								href={{
									pathname: "/products",
									query: { ...queryObj, category: cat.title },
								}}
							>
								{cat.title}
							</Link>
						</li>
					))}
				</ul>
				<Accordion type="multiple" className="animate-none">
					<AccordionItem value="Category">
						<AccordionTrigger className="py-3 text-sm text-slate-400 hover:text-slate-500">
							<span className="font-bold text-slate-800">Brand</span>
						</AccordionTrigger>
						<AccordionContent className="pt-6 animate-none">
							<ul className="space-y-4">
								{brands.map((option, idx) => (
									<li key={idx} className="flex items-center">
										<input
											type="checkbox"
											onChange={() => applyArrayFilter("brand", option.title)}
											checked={filters.brand.includes(option.title)}
											id={option.title}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
										<label htmlFor={option.title} className="ml-2 text-sm">
											{option.title}
										</label>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="Price">
						<AccordionTrigger className="py-3 text-sm text-slate-400 hover:text-slate-500">
							<span className="font-bold text-slate-800">Price</span>
						</AccordionTrigger>
						<AccordionContent className="pt-6 animate-none">
							<ul className="space-y-4">
								{PRICE_FILTERS.map((option, idx) => (
									<li key={idx} className="flex items-center">
										<input
											type="radio"
											onChange={() =>
												setFilters((prev) => ({ ...prev, price: option }))
											}
											checked={filters.price.value === option.value}
											id={option.title}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
										<label htmlFor={option.title} className="ml-2 text-sm">
											{option.title}
										</label>
									</li>
								))}
								<li className="flex flex-col">
									<div className="flex items-center justify-between mb-4">
										<p>Price:</p>
										<div>
											{Math.min(filters.price.value[0], filters.price.value[1])}{" "}
											-{" "}
											{Math.max(filters.price.value[0], filters.price.value[1])}
										</div>
									</div>
									<Slider
										onValueChange={(range) => {
											const [newMin, newMax] = range;

											console.log({ newMin, newMax });

											setFilters((prev) => ({
												...prev,
												price: {
													title: "Optional",
													value: [newMin, newMax],
												},
											}));
										}}
										value={filters.price.value}
										min={DEFAULT_PRICE[0]}
										max={DEFAULT_PRICE[1]}
										defaultValue={DEFAULT_PRICE}
										step={500000}
									/>
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="flex flex-col flex-1 pr-8 lg:pr-20">
				<div className="flex w-full pb-6 justify-between items-baseline gap-x-6 border-b border-gray-200">
					<h1 className="text-3xl font-bold text-slate-800">Products</h1>
					<div className="flex items-center">
						<DropdownMenu>
							<DropdownMenuTrigger className="group inline-flex justify-center gap-x-1 text-sm font-medium text-gray-700 hover:text-gray-900">
								Sort
								<ChevronDownIcon className="-mr-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{SORT_OPTIONS.map((option) => (
									<button
										className={cn(
											"text-left w-full block px-4 py-2 text-sm",
											filters.sort === option.value
												? "text-slate-800 bg-gray-100"
												: "text-slate-600"
										)}
										key={option.name}
										onClick={() =>
											setFilters((prev) => ({ ...prev, sort: option.value }))
										}
									>
										{option.name}
									</button>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="w-full mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-red-600">
					{loading &&
						new Array(12)
							.fill(null)
							.map((_, idx) => <ProductSkeleton key={idx} />)}
					{!loading && products.length === 0 && (
						<div className="w-full col-span-2 lg:col-span-4 items-center justify-center py-8 text-slate-800 font-semibold">
							No product found
						</div>
					)}
					{!loading &&
						products.length &&
						products.map((product) => (
							<ProductCard key={product._id} data={product} />
						))}
				</div>
				{!loading && products.length !== 0 && (
					<div className="mt-10 flex w-full items-center justify-center gap-x-2 flex-nowrap">
						<div
							className={cn(
								"h-10 w-8 flex items-center justify-center bg-white hover:bg-gray-100 cursor-pointer border border-gray-300"
							)}
							onClick={() => applyChangePage(filters.page - 1)}
						>
							<ChevronDoubleLeftIcon className="h-4 w-4" />
						</div>
						{new Array(countPages).fill(null).map((_, idx) => (
							<div
								key={idx}
								className={cn(
									"h-10 w-8 flex items-center justify-center bg-white hover:bg-gray-100 cursor-pointer border border-gray-300"
								)}
								onClick={() => applyChangePage(idx + 1)}
							>
								{idx + 1}
							</div>
						))}
						<div
							className={cn(
								"h-10 w-8 flex items-center justify-center bg-white hover:bg-gray-100 cursor-pointer border border-gray-300"
							)}
							onClick={() => applyChangePage(filters.page + 1)}
						>
							<ChevronDoubleRightIcon className="h-4 w-4" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductsPage;
