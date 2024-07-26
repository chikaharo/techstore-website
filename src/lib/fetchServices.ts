export const revalidate = 1000 * 3600;

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getPhoneProducts = async () => {
	const res = await fetch(BASE_URL + "/product?category=phone", {
		next: { revalidate: 1000 * 3600 },
	});
	const resData = await res.json();
	if (!resData.data) {
		throw new Error("Can fetch Phone Products");
	}

	return resData.data.products;
};
const getLaptopProducts = async () => {
	const res = await fetch(BASE_URL + "/product?category=laptop", {
		next: { revalidate: 1000 * 3600 },
	});
	const resData = await res.json();
	console.log("fetch laptop: ", resData);
	if (!resData.data) {
		throw new Error("Can fetch Laptop Products");
	}

	return resData.data.products;
};

const getProduct = async (slug: string) => {
	const res = await fetch(BASE_URL + `/product/${slug}`, {
		next: { revalidate: 3600 * 1000 * 24 },
	});
	const resData = await res.json();
	if (!resData.data) {
		throw new Error("Can fetch Laptop Products");
	}

	return resData.data;
};

const getSimilarProducts = async (prodId: string) => {
	const res = await fetch(BASE_URL + `/product/similar?id=${prodId}`, {
		next: { revalidate: 3600 * 1000 * 24 },
	});
	const resData = await res.json();
	if (!resData.data) {
		throw new Error("Can fetch Laptop Products");
	}

	return resData.data.products;
};

const getCart = async (token: string): Promise<Cart[]> => {
	const res = await fetch(BASE_URL + `/product/cart`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		cache: "no-cache",
	});
	const resData = await res.json();
	if (!resData.data) {
		throw new Error("Can fetch Laptop Products");
	}

	return resData.data;
};

const getWishList = async (token: string): Promise<Product[]> => {
	const res = await fetch(BASE_URL + `/user/wishlist`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		cache: "no-cache",
	});
	const resData = await res.json();
	if (!resData.data) {
		throw new Error("Can fetch Laptop Products");
	}

	return resData.data;
};

export {
	getLaptopProducts,
	getPhoneProducts,
	getProduct,
	getSimilarProducts,
	getCart,
};
