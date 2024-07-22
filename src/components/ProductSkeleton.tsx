const ProductSkeleton = () => {
	return (
		<div className="relative animate-pulse">
			<div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-auto lg:h-80">
				<div className="h-full w-full bg-gray-200"></div>
				<div className="mt-4 flex flex-col gap-2"></div>
				<div className="mt-4 flex flex-col gap-2">
					<div className="bg-gray-200 w-full h-4"></div>
					<div className="bg-gray-200 w-full h-4"></div>
				</div>
			</div>
		</div>
	);
};

export default ProductSkeleton;
