"use client";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Command, CommandInput } from "cmdk";
import { Popover, PopoverContent } from "./ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type Props = {
	className?: string;
};

const SearchBar = ({ className }: Props) => {
	const searchParams = useSearchParams();
	const searchString = Object.fromEntries(searchParams.entries());
	const router = useRouter();
	const [keyword, setKeyword] = useState<string>(
		searchString.title ? searchString.title : ""
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		setKeyword(event.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const queryString = qs.stringify({ ...searchString, title: keyword });
		router.push(`/products?${queryString}`);
	};

	const setOpen = () => {};

	return (
		<form className="relative" onSubmit={handleSubmit}>
			<div
				className={cn(
					"flex items-center bg-white rounded-3xl  p-2 min-w-[250px] lg:w-96",
					className
				)}
			>
				<input
					type="text"
					value={keyword}
					onChange={handleChange}
					className="flex-1 pl-2 border-none outline-none focus-visible:border-0 focus-visible:ring-0"
				/>
				<Button className="w-8 h-8 absolute right-1 top-0.1 p-3 bg-gray-400 text-slate-900 hover:bg-gray-300 rounded-full">
					<MagnifyingGlassIcon className="h-6" />
				</Button>
			</div>
		</form>
	);
};

export default SearchBar;
