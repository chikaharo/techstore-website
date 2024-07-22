"use client";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
	AdjustmentsHorizontalIcon,
	UserGroupIcon,
	UserPlusIcon,
	UsersIcon,
	ShoppingCartIcon,
	BuildingOffice2Icon,
	CircleStackIcon,
	SwatchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { BookmarkSquareIcon } from "@heroicons/react/24/solid";

interface INavigation {
	title: string;
	icon: any;
	link: string;
	childrens?: INavigation[];
}

const navigations: INavigation[] = [
	{
		title: "Dashboard",
		icon: AdjustmentsHorizontalIcon,
		link: "/admin",
		childrens: [],
	},
	{
		title: "Customer",
		icon: UserGroupIcon,
		link: "#",
		childrens: [
			{
				title: "Add Customer",
				icon: UserPlusIcon,
				link: "/admin/add-customer",
			},
			{
				title: "Customer List",
				icon: UsersIcon,
				link: "/admin/list-customer",
			},
		],
	},
	{
		title: "Catalog",
		icon: ShoppingCartIcon,
		link: "#",
		childrens: [
			{
				title: "Add Product",
				icon: ShoppingCartIcon,
				link: "/admin/add-product",
			},
			{
				title: "Product List",
				icon: ShoppingCartIcon,
				link: "/admin/list-product",
			},
			{
				title: "Add Brand",
				icon: BuildingOffice2Icon,
				link: "/admin/add-brand",
			},
			{
				title: "Brand List",
				icon: BuildingOffice2Icon,
				link: "/admin/list-brand",
			},
			{
				title: "Add Category",
				icon: CircleStackIcon,
				link: "/admin/add-category",
			},
			{
				title: "Category List",
				icon: CircleStackIcon,
				link: "/admin/list-category",
			},
			{
				title: "Add Color",
				icon: SwatchIcon,
				link: "/admin/add-color",
			},
			{
				title: "Color List",
				icon: SwatchIcon,
				link: "/admin/list-color",
			},
		],
	},
	{
		title: "Marketing",
		icon: BookmarkSquareIcon,
		link: "#",
		childrens: [
			{
				title: "Add Coupon",
				icon: UserPlusIcon,
				link: "/admin/add-coupon",
			},
			{
				title: "Coupon List",
				icon: UsersIcon,
				link: "/admin/list-coupon",
			},
		],
	},
];

const Sidebar = () => {
	const pathname = usePathname();

	const isActive = (link: string) => {
		return pathname === link || pathname?.startsWith(`/${link}`);
	};

	return (
		<div className="sticky ">
			<ScrollArea className=" flex flex-col shadow-md">
				<div className="h-24 flex w-full justify-center items-center ">
					<h1 className="text-3xl text-white font-semibold">Tech Store</h1>
				</div>
				<div className="flex flex-col w-full text-gray-300">
					<Collapsible>
						{navigations.map((nav, ind) => {
							if (nav.childrens!.length) {
								return (
									<div key={ind} className="w-full">
										<CollapsibleTrigger>
											<div className="flex w-full py-3 pl-6 pr-3 items-center justify-between">
												<div className="flex items-center space-x-2">
													{<nav.icon className="h-6 w-6" />}
													<span>{nav.title}</span>
												</div>
											</div>
										</CollapsibleTrigger>
										{nav.childrens!.map((child, ind) => (
											<CollapsibleContent
												key={ind}
												className="w-full bg-slate-900"
											>
												<div className="p-1">
													<Link
														href={child.link}
														className={cn(
															"flex items-center py-3 pl-8 space-x-2 hover:text-gray-100 hover:font-bold rounded-lg transition-all",
															isActive(child.link) &&
																"bg-sky-600 text-gray-100 font-bold"
														)}
													>
														<child.icon className="h-6 w-6" />
														<span>{child.title}</span>
													</Link>
												</div>
											</CollapsibleContent>
										))}
									</div>
								);
							} else {
								return (
									<div key={ind} className="w-full p-1">
										<Link
											href={nav.link}
											className={cn(
												"flex w-full py-3 pl-6 pr-3 items-center space-x-2 hover:text-gray-100 hover:font-bold rounded-lg",
												isActive(nav.link!) &&
													"bg-sky-600 text-gray-100 font-bold"
											)}
										>
											<nav.icon className="h-6 w-6" />
											<span>{nav.title}</span>
										</Link>
									</div>
								);
							}
						})}
					</Collapsible>
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sidebar;
