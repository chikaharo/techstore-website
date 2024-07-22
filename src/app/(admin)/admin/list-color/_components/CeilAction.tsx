import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Link, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "./Column";
import AlertModal from "@/components/ui/alert-modal";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface Props {
	category: Category;
}

const CeilAction = ({ category }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onEdit = () => {
		router.push(`/admin/edit-color/${category.id}`);
	};

	const confirmDelete = async () => {
		setIsLoading(true);
		try {
			const res = await axios.delete(`/color/${category.id}`);
			console.log("confirm delete color: ", res);
			router.refresh();
			toast("Deleted color successfully");
		} catch (error) {
			console.log("Delete category error: ", error);
			toast("Deleted color failed");
		}
		setIsLoading(false);
		setIsOpen(false);
	};

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={confirmDelete}
				title="Are you sure to delete this category"
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex items-center gap-2">
						<PencilIcon className="h-6 w-6" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex gap-x-2 cursor-pointer"
						onClick={() => setIsOpen(true)}
					>
						{/* <Button variant="outline" className="w-full flex gap-2"> */}
						<TrashIcon className="h-6 w-6" />
						Delete
						{/* </Button> */}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CeilAction;
