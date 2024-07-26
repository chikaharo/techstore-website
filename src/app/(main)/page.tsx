"use server";
import Banner from "@/components/Banner";
import LaptopProducts from "@/components/LaptopProducts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PhoneProducts from "@/components/PhoneProducts";
import { ProductsRowLoading } from "@/components/ProductsRowLoading";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<MaxWidthWrapper className="pb-24 sm:pb-32 xl:pb-52 pt-10 lg:pt-24 xl:pt-10 lg:gap-x-0 xl:gap-x-8 flex flex-col">
				<Suspense fallback={<ProductsRowLoading />}>
					<PhoneProducts />
				</Suspense>
				<Suspense fallback={<ProductsRowLoading />}>
					<LaptopProducts />
				</Suspense>
			</MaxWidthWrapper>
		</div>
	);
}
