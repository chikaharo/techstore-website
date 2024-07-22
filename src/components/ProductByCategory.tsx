import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProductCard from "./ProductCard";

export interface Tag {
	title: string;
	url: string;
}

interface Props {
	category: string;
	tags: Tag[];
	products: Product[];
}

const ProductByCategory = ({ category, tags, products }: Props) => {
	return (
		<MaxWidthWrapper>
			<section className="my-8">
				<div className="flex flex-col w-full ">
					{/* TOP  */}
					<div className="flex flex-col gap-y-2">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold uppercase">{category}</h2>
							<Link href={`/products?category=${category}`}> Xem tất cả</Link>
						</div>
						<div className="flex items-center gap-x-2 max-w flex-nowrap overflow-x-auto no-scrollbar">
							{tags.map((tag) => (
								<Link
									key={tag.title}
									href={tag.url}
									className="bg-slate-200 hover:bg-slate-400 p-2 rounded-xl cursor-pointer"
								>
									{tag.title}
								</Link>
							))}
						</div>
					</div>

					{/* CONTENT  */}
					{products.length ? (
						<div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{products.map((prod) => (
								<ProductCard key={prod._id} data={prod} />
							))}
						</div>
					) : null}
				</div>
			</section>
		</MaxWidthWrapper>
	);
};

export default ProductByCategory;
