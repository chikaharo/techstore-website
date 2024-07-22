import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

const slides = [
	{
		url: "https://fptshop.com.vn/Uploads/originals/2023/6/16/638225012888439267_1920x1080.png",
		alt: "iphone 14",
	},
	{
		url: "https://cdn.dienthoaigiakho.vn/photos/1644641693487-s22ultr-info.jpg",
		alt: "samsung",
	},
];

const Banner = () => {
	return (
		<div className="container mx-auto h-[26rem] md:h-[30rem] lg:h-[28rem] xl:h-[35rem]">
			<Carousel className="w-[72rem]">
				<CarouselContent className="">
					{slides.map((slide, ind) => (
						<CarouselItem key={ind}>
							<div className="w-full h-[26rem] md:h-[30rem] lg:h-[28rem] xl:h-[35rem] flex relative">
								<Image
									src={slide.url}
									alt={slide.alt}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default Banner;
