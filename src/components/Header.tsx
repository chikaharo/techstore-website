import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import BigLogo from "@/../public/logo/big.png";
import Link from "next/link";
import SearchBar from "./SearchBar";
import {
	ShoppingCartIcon,
	HeartIcon,
	PhoneIcon,
} from "@heroicons/react/24/solid";
import UserDropDown from "./UserDropDown";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
	return (
		<header className="w-full bg-slate-800 sticky top-0 z-50">
			<div className=" mx-auto h-20 relative flex items-center justify-around">
				<Link href="/">
					<div className="relative flex items-center w-36 md:w-44 lg:w-48 h-14 ">
						<Image
							src={BigLogo}
							alt="logo"
							// fill={true}
							style={{ objectFit: "contain" }}
							layout="fill"
						/>
					</div>
				</Link>

				<NavigationMenu className="" />

				<SearchBar />

				<div className="flex items-center">
					<Link href="/cart">
						<div className="flex gap-2 items-center p-2 md:p-4 cursor-pointer capitalize text-xl xxsm:text-lg xsm:text-lg sm:text-lg md:text-lg lg:text-lg xsm:flex-col hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden font-bold">
							<ShoppingCartIcon className="h-6" />
							<span>Cart</span>
						</div>
					</Link>
					<Link href="/user/wishlist">
						<div className="hidden md:flex gap-2 items-center p-4 cursor-pointer capitalize text-xl xxsm:text-lg xsm:text-lg sm:text-lg md:text-lg lg:text-lg xsm:flex-col hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden font-bold">
							<HeartIcon className="h-6" />
							<span>Wishlist</span>
						</div>
					</Link>
					<Link href="/cart">
						<div className="hidden md:flex gap-2 items-center p-4 cursor-pointer capitalize text-xl xxsm:text-lg xsm:text-lg sm:text-lg md:text-lg lg:text-lg xsm:flex-col hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden font-bold">
							<PhoneIcon className="h-6" />
							<span>Contact</span>
						</div>
					</Link>
				</div>
				<UserDropDown />
			</div>
		</header>
	);
};

export default Header;
