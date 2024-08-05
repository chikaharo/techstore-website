"use client";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutItem from "@/components/CheckoutItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useCartContext } from "@/providers/CartProvider";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const CartPage = () => {
	const { data: session } = useSession();
	// console.log("cartPage session: ", session);
	// const [cartData, setCartData] = useState<Cart[]>([]);
	// const [loading, setLoading] = useState(false);
	const {
		cartData,
		totalPrice,
		loading,
		addToCart,
		subFromCart,
		deleteFromCart,
		testFn,
	} = useCartContext();

	const { toast } = useToast();

	return (
		<MaxWidthWrapper>
			<div className="flex flex-col lg:flex-row gap-6 py-8 pb-28">
				<div className="w-full lg:w-2/3 flex h-full flex-col  relative">
					<h1 className="text-2xl font-bold">
						Your Cart ({cartData?.length || 0})
					</h1>
					<ScrollArea className="h-48 w-full lg:h-screen">
						<div className="flex flex-col gap-4">
							{!loading && !cartData.length && (
								<div className="flex w-full h-[600px] justify-center items-center">
									<Loader2 className="mr-2 h-8 w-8 animate-spin" />
								</div>
							)}
							{!loading &&
								cartData.map((cart, idx) => (
									<CheckoutItem
										key={idx}
										item={cart}
										loading={loading}
										decre={() =>
											subFromCart({
												colorId: cart.color._id,
												productId: cart.product._id,
											})
										}
										deleteCart={() =>
											deleteFromCart({
												cartId: cart._id,
											})
										}
										incre={() =>
											addToCart({
												colorId: cart.color._id,
												productId: cart.product._id,
											})
										}
									/>
								))}
						</div>
					</ScrollArea>

					<div className="">{/* <TotalCheckout total={totalPrice} /> */}</div>
				</div>
				<div className="w-full lg:w-1/3">
					<CheckoutForm total={totalPrice} />
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default CartPage;
