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

interface Category {
	id: string;
	title: string;
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

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	role: string;
	created_at: string;
	updated_at?: any;
	iat: number;
	exp: number;
	jti: string;
}

interface Color {
	_id: string;
	title?: string;
	value?: string;
	createdAt?: string;
}

interface Image {
	asset_id?: string | null;
	public_id: string;
	url: string;
	_id: string;
}

interface Cart {
	_id: string;
	color: Color;
	product: Product;
	quantity: number;
}

interface IFilters {
	title?: string;
	category?: string;
	brand: string[];
	sort: string;
	price?: {
		title: string;
		value: [number, number];
	};
	page: number;
}

interface IProvinceData {
	Id: string;
	Name: string;
	Districts: IDistrict[];
}

interface IDistrict {
	Id: string;
	Name: string;
	Wards: IWard[];
}

interface IWard {
	Id: string;
	Name: string;
	Level: string;
}
