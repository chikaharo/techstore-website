"use client";
import { ColumnDef } from "@tanstack/react-table";
import CeilAction from "./CeilAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
	id: string;
	title: string;
	createdAt: string;
};

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;

			return <CeilAction category={category} />;
		},
	},
];
