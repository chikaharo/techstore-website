"use client";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	UserCircleIcon,
	ChevronDownIcon,
	ArrowRightEndOnRectangleIcon,
	PencilSquareIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const UserDropDown = () => {
	const session = useSession();

	console.log("userDropdow sessiion:", session);

	const user = session?.data?.user;

	return (
		<div className="hidden lg:block">
			<DropdownMenu>
				<DropdownMenuTrigger className="flex gap-2 items-center p-4 cursor-pointer capitalize text-xl xxsm:text-lg xsm:text-lg sm:text-lg md:text-lg lg:text-lg xsm:flex-col hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden font-bold">
					<UserCircleIcon className="h-6" />
					<span className="max-w-[100px] overflow-hidden text-ellipsis text-nowrap">
						{user ? user.name : "User Model"}
					</span>
					<ChevronDownIcon className="h-6" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{user && user.name ? (
						<>
							<DropdownMenuItem className="p-0">
								<Link
									href="/user/profile"
									className="min-w-[180px] w-full h-full flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg "
								>
									<UserCircleIcon className="h-6" />
									My Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0">
								<Link
									href="/user/order"
									className="min-w-[180px] w-full h-full flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg "
								>
									<ShoppingBagIcon className="h-6" />
									Purchase
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0">
								<Button
									variant="outline"
									onClick={() => signOut()}
									className="min-w-[180px] w-full h-full flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg "
								>
									<ArrowLeftEndOnRectangleIcon className="h-6" />
									Log Out
								</Button>
							</DropdownMenuItem>
						</>
					) : (
						<>
							<DropdownMenuItem className="p-0">
								<Link
									href="/login"
									className="min-w-[180px] w-full h-full flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg "
								>
									<ArrowRightEndOnRectangleIcon className="h-6" />
									Log In
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href="/login"
									className="min-w-[180px] w-full h-full flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg "
								>
									<PencilSquareIcon className="h-6" />
									Register
								</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserDropDown;
