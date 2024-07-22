import LoadingModal from "@/components/LoadingModal";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
	HeartIcon,
	ShoppingBagIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
	return (
		<MaxWidthWrapper className="py-8 gap-x-4">
			<div className="flex relative items-start">
				<div className="sticky top-20 left-0 flex flex-col justify-center px-4 lg:px-8">
					<h3 className="text-2xl font-bold">Hello, Huy Dinh</h3>
					<div className="flex flex-col gap-2 mt-8">
						<Link
							href="/user/profile"
							className=" w-full flex items-center gap-x-2 p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm md:text-base"
						>
							<UserIcon className="h-6 w-6" />
							Profile
						</Link>
						<Link
							href="/user/order"
							className=" w-full flex items-center gap-x-2 p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm md:text-base"
						>
							<ShoppingBagIcon className="h-6 w-6" />
							My Order
						</Link>
						<Link
							href="/user/wishlist"
							className=" w-full flex items-center gap-x-2 p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm md:text-base"
						>
							<HeartIcon className="h-6 w-6" />
							Wishlist
						</Link>
					</div>
				</div>
				<div className="flex flex-1 flex-col">
					<Suspense fallback={<LoadingModal />}>{children}</Suspense>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default UserLayout;
