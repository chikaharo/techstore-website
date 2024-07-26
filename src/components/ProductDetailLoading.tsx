import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "./SkeletonCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ProductsRowLoading } from "./ProductsRowLoading";

export default function ProductDetailLoading() {
	return (
		<MaxWidthWrapper>
			<div className="flex h-full w-full flex-col">
				<Skeleton className="h-4 w-[250px" />
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="w-full lg:w-2/3">
						<Skeleton className="h-[398px] w-full" />
					</div>
					<div className="w-full lg:w-1/3 space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="my-10">
					<ProductsRowLoading />
				</div>
				<div className="mt-10 space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[100px]" />
					<Skeleton className="h-4 w-9/12" />
					<Skeleton className="h-4 w-9/12" />
					<Skeleton className="h-4 w-9/12" />
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
