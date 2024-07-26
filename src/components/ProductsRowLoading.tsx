import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "./SkeletonCard";

export function ProductsRowLoading() {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-4 w-[3000px] rounded-xl" />
			<div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{new Array(6).fill(0).map((_, idx) => (
					<SkeletonCard key={idx} />
				))}
			</div>
		</div>
	);
}
