interface Order {
	_id: string;
	products: {
		product: Product;
		color: Color;
		quantity: number;
	}[];
	orderStatus: String;
	name: string;
	phone: string;
	address: string;
	total: number;
	totalAfterDiscount: number;
	totalQuantity: number;
	createdAt: string;
}

interface Product {
	_id: string;
	title: string;
	slug: string;
	description: string;
	brand: string;
	category: string;
	colors: Color[];
	price: number;
	quantity: number;
	images: Image[];
	thumbnail: string;
	ratings: [];
	totalRating: string;
	sold: number;
}

interface Color {
	_id: string;
	title?: string;
	value?: string;
	createdAt?: string;
}

interface Image {
	public_id: string;
	url: string;
	_id: string;
}

interface IFilters {
	title?: string;
	category?: string;
	brand: string[];
	sort: string;
	price: {
		title: string;
		value: [number, number];
	};
	page: number;
}
