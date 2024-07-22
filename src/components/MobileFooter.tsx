import {
	HeartIcon,
	HomeIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const MobileFooter = () => {
	return (
		<footer className="fixed z-1000 bottom-0 left-0 right-0 h-20 lg:hidden w-full border-t-2 border-slate-800 p-2 bg-slate-700 text-white py-8">
			<div className="flex h-full items-center justify-around">
				<Link
					href="/"
					className="p-4 text-sm flex flex-col gap-1 items-center rounded-md hover:bg-gray-100/80"
				>
					<HomeIcon className="h-5 w-5" />
					Home
				</Link>
				<Link
					href="/"
					className="p-4 text-sm flex flex-col gap-1 items-center rounded-md hover:bg-gray-100/80"
				>
					<HeartIcon className="h-5 w-5" />
					Wishlist
				</Link>
				<Link
					href="/user/profile"
					className="p-4 text-sm flex flex-col gap-1 items-center rounded-md hover:bg-gray-100/80"
				>
					<UserCircleIcon className="h-5 w-5" />
					User
				</Link>
			</div>
		</footer>
	);
};

export default MobileFooter;
