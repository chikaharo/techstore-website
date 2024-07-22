"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CeilAction from "./CeilAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Color = {
	_id: string;
	title: string;
	value: string;
	createdAt: string;
};
export type Product = {
	_id: string;
	id?: string;
	title: string;
	slug: string;
	description: string;
	price: number;
	category: string;
	brand: string;
	quantity: number;
	thumbnail: string;
	tags?: string;
	images: ProdImage[];
	colors: Color[];
	totalrating?: string;
	ratings: [];
	createdAt?: string;
};

export type ProdImage = {
	url: string;
	public_id: string;
	asset_id: string | null;
};

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "brand",
		header: "Brand",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "sold",
		header: "Sold",
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const product = row.original;

			return <CeilAction product={product} />;
		},
	},
];
