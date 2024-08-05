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

export const columns: ColumnDef<Color>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		id: "value",
		header: "Value",
		cell: ({ row }) => {
			const color = row.original;
			return (
				<div className="w-full  ">
					<div
						className="w-[84px] h-8 p-1 px-2 flex items-center justify-center"
						style={{ background: color.value }}
					>
						<p>{color.value}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const color = row.original;

			return <CeilAction color={color} />;
		},
	},
];
