"use client";
import { useToast } from "@/components/ui/use-toast";
import { getCart } from "@/lib/fetchServices";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useReducer,
	useEffect,
} from "react";
import axios from "@/lib/axios";

type CartContextType = {
	cartData: Cart[];
	totalPrice: number;
	loading: boolean;
	addToCart: ({
		colorId,
		productId,
	}: {
		colorId: string;
		productId: string;
	}) => void;
	subFromCart: ({
		colorId,
		productId,
	}: {
		colorId: string;
		productId: string;
	}) => void;
	deleteFromCart: ({ cartId }: { cartId: string }) => void;
	testFn: () => void;
};

export const CartContext = createContext<CartContextType>({
	cartData: [],
	totalPrice: 0,
	loading: false,
	addToCart: () => {},
	subFromCart: () => {},
	deleteFromCart: () => {},
	testFn: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const { toast } = useToast();
	// if (!session) {
	// 	redirect("/login");
	// }

	useEffect(() => {
		const fetchCartData = async () => {
			if (session) {
				const data = await getCart(session?.user.accessToken);
				console.log("fetch Cart data:", data);
				setCart(data);
			}
		};
		fetchCartData();
	}, [session]);

	useEffect(() => {
		const calculated = cart.reduce((acc, cur) => {
			return (acc += cur.product.price * cur.quantity);
		}, 0);
		setTotalPrice(calculated);
	}, [cart]);

	const addToCart = async ({
		colorId,
		productId,
	}: {
		colorId: string;
		productId: string;
	}) => {
		setLoading(true);
		try {
			const res = await axios.put(
				`/product/add-cart`,
				{ prodId: productId, colorId },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			if (res.data.status !== "success") {
				throw new Error("Add to cart failed");
			}
			const addedItemIdx = cart.findIndex(
				(item) => item.color._id === colorId && item.product._id === productId
			);
			const updatedCart = [...cart];
			updatedCart[addedItemIdx] = {
				...updatedCart[addedItemIdx],
				quantity: updatedCart[addedItemIdx].quantity + 1,
			};
			setCart(updatedCart);
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });
			console.log("handleAdd error:", error);
		}
		setLoading(false);
	};
	const subFromCart = async ({
		productId,
		colorId,
	}: {
		productId: string;
		colorId: string;
	}) => {
		setLoading(true);
		try {
			const res = await axios.put(
				`/product/remove-cart`,
				{ prodId: productId, colorId },
				{
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				}
			);
			console.log("add to cart res:", res.data);
			if (res.data.status !== "success") {
				throw new Error("Minus from cart failed");
			}
			const subedItemIdx = cart.findIndex(
				(item) => item.color._id === colorId && item.product._id === productId
			);
			const updatedCart = [...cart];
			if (updatedCart[subedItemIdx].quantity <= 1) {
				updatedCart.splice(subedItemIdx, 1);
			} else {
				updatedCart[subedItemIdx] = {
					...updatedCart[subedItemIdx],
					quantity: updatedCart[subedItemIdx].quantity - 1,
				};
			}

			setCart(updatedCart);
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });
			console.log("handleDelete error:", error);
		}
		setLoading(false);
	};
	const deleteFromCart = async ({ cartId }: { cartId: string }) => {
		setLoading(true);
		try {
			const res = await axios.delete(`/product/cart/${cartId}`, {
				headers: {
					Authorization: `Bearer ${session?.user?.accessToken}`,
				},
			});
			console.log("delete from cart res: ", res);
			if (res.data.status !== "success") {
				throw new Error("Minus from cart failed");
			}
			const updatedCart = [...cart].filter((item) => item._id !== cartId);
			setCart(updatedCart);
		} catch (error: any) {
			toast({ title: error.message, variant: "destructive" });
			console.log("handleDelete error:", error);
		}
		setLoading(false);
	};
	const testFn = () => {
		console.log("test fucntion");
	};

	return (
		<CartContext.Provider
			value={{
				cartData: cart,
				totalPrice,
				loading,
				addToCart,
				subFromCart,
				deleteFromCart,
				testFn,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCartContext = () => {
	return useContext(CartContext);
};
