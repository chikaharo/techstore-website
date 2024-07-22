"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { QueueListIcon } from "@heroicons/react/24/solid";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
} from "./ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const components: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

const phoneSelects = {
	brands: [
		{
			title: "Samsung",
			link: "#",
		},
		{
			title: "iPhone",
			link: "#",
		},
		{
			title: "Huawei",
			link: "#",
		},
		{
			title: "Xiaomi",
			link: "#",
		},
		{
			title: "Bphone",
			link: "#",
		},
		{
			title: "OPPO",
			link: "#",
		},
		{
			title: "Oneplus",
			link: "#",
		},
		{
			title: "Vivo",
			link: "#",
		},
		{
			title: "Nokia",
			link: "#",
		},
	],
	priceRanges: [
		{
			title: "Under 5 million VND",
			link: "#",
		},
		{
			title: "From 5 to 15 million VND",
			link: "#",
		},
		{
			title: "From 15 to 25 million VND",
			link: "#",
		},
		{
			title: "Above 25 million VND",
			link: "#",
		},
	],
	hots: [
		{
			title: "iPhone 15 Pro Max",
			link: "#",
		},
		{
			title: "Oneplus 7 Pro",
			link: "#",
		},
		{
			title: "Samsung Galaxy S24 Ultra",
			link: "#",
		},
		{
			title: "Nokia 1280",
			link: "#",
		},
		{
			title: "Xiaomi 15 Ultra",
			link: "#",
		},
		{
			title: "Vivo iqoo 5",
			link: "#",
		},
	],
};

interface Props {
	className: string;
}

const CatalogNavigationMenu = ({ className }: Props) => {
	return (
		<NavigationMenu className={cn(className)}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex gap-2 items-center p-4 cursor-pointer capitalize text-xl xxsm:text-lg xsm:text-lg sm:text-lg md:text-lg lg:text-lg xsm:flex-col bg-slate-800 hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden font-bold">
						<QueueListIcon className="h-6" />
						<span className="hidden md:flex">Catalogs</span>
					</NavigationMenuTrigger>
					<NavigationMenuContent className="">
						<Tabs
							defaultValue="account"
							className=" w-[450px] lg:w-[880px] lg:h-[600px] flex overflow-hidden"
							orientation="vertical"
						>
							<TabsList className="flex flex-col justify-start space-y-2 p-0 h-full">
								<TabsTrigger value="phone" className="p-4 px-8">
									Phone
								</TabsTrigger>
								<TabsTrigger value="laptop" className="p-4 px-8">
									Laptop
								</TabsTrigger>
							</TabsList>
							<TabsContent className="flex-1" value="phone">
								<div className="w-full grid grid-cols-2 lg:grid-cols-3 px-6 py-2">
									<div className="flex flex-col">
										<h3 className="text-xl font-bold mb-2">Select by brand</h3>
										<ul className="flex flex-col space-y-2">
											{phoneSelects.brands.map((psl) => (
												<li key={psl.title}>
													<Link href={psl.link}>{psl.title}</Link>
												</li>
											))}
										</ul>
									</div>
									<div className="flex flex-col">
										<h3 className="text-xl font-bold mb-2">
											Phone price range
										</h3>
										<ul className="flex flex-col space-y-2">
											{phoneSelects.priceRanges.map((psl) => (
												<li key={psl.title}>
													<Link href={psl.link}>{psl.title}</Link>
												</li>
											))}
										</ul>
									</div>
									<div className="lg:hidden"></div>
									<div className="flex flex-col">
										<h3 className="text-xl font-bold mb-2">Hot</h3>
										<ul className="flex flex-col space-y-2">
											{phoneSelects.hots.map((psl) => (
												<li key={psl.title}>
													<Link href={psl.link}>{psl.title}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</TabsContent>
							<TabsContent value="password">
								Change your password here.
							</TabsContent>
						</Tabs>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default CatalogNavigationMenu;
