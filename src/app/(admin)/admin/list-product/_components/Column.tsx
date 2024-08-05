"use client";

import { ColumnDef } from "@tanstack/react-table";
import CeilAction from "./CeilAction";

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
