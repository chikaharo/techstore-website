"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { useToast } from "@/components/ui/use-toast";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
	product: Product;
}

const ProductSwiper = ({ product }: Props) => {
	const { toast } = useToast();
	const { data: session } = useSession();

	const handleAddWishlist = async (prodId: string) => {
		try {
			const res = await axios.put(
				"/product/wishlist",
				{
					prodId: prodId,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.user.accessToken}`,
					},
				}
			);
			if (res.data.status !== "success") {
				throw new Error(res.data.message);
			}
			toast({
				title: res.data.message,
			});
		} catch (error) {
			console.log(error);
			toast({
				title: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<div className="relative">
			<Swiper
				// pagination={pagination}
				modules={[Pagination, Navigation, Autoplay]}
				loop={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true,
				}}
				navigation
				className=""
			>
				<HeartIcon
					className="absolute top-2 left-2 w-6 h-6 cursor-pointer text-red-600 z-20 hover:scale-110"
					onClick={() => handleAddWishlist(product._id)}
				/>

				{product.images.map((img, index) => {
					if (index !== 0) {
						return (
							<SwiperSlide key={index}>
								<LightGallery
									key={index}
									speed={500}
									plugins={[lgThumbnail, lgZoom, lgFullscreen]}
									// className="flex"
								>
									<a href={img.url}>
										<div className="w-full h-[350px] md:h-[400px] lg:h-[500px] relative">
											<Image
												src={img.url}
												alt="product-img"
												// className="w-full h-[350px] m-auto object-cover"
												fill
												objectFit="contain"
											/>
										</div>
									</a>
								</LightGallery>
							</SwiperSlide>
						);
					} else {
						return (
							<SwiperSlide key={img}>
								<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full w-full min-w-[718px] min-h-[398px] rounded-[10px]">
									<div className="flex items-center w-full min-h-[398px] gap-2 p-4">
										<div className="w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] relative">
											<Image
												src={product.thumbnail}
												alt="product-thumb"
												fill
												// className="w-[270px] h-[270px] rounded-[10px] object-cover"
											/>
										</div>
										<div className="text-white ml-6">
											<p className="text-lg mb-[5px] uppercase font-semibold text-center">
												Tính năng nổi bật
											</p>
											<div>
												<ul className="text-sm flex flex-col gap-[5px]">
													{/* <li>{desc}</li> */}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
						);
					}
				})}
			</Swiper>
		</div>
	);
};

export default ProductSwiper;
