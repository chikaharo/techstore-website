"use client";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

interface Props {
	products: Product[];
}

const SimilarProducts = ({ products }: Props) => {
	console.log("similar Products page: ", products);
	return (
		<div className="mt-6">
			<h3 className="text-slate-800 text-xl font-bold">Similar Products</h3>
			{products.length && (
				<Swiper
					spaceBetween={10}
					modules={[Navigation, Autoplay]}
					loop={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation
					slidesPerGroupAuto
					slidesPerView={"auto"}
					className="!min-h-[0] mt-[85px] md:mt-5 md:!mx-0 !mx-4 rounded-xl !p-[10px] flex flex-nowrap"
				>
					{products.map((product) => (
						<SwiperSlide
							key={product._id}
							className="!w-[228px] rounded-[15px] shadow-cellphone p-[10px]"
						>
							<ProductCard data={product} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};

export default SimilarProducts;
