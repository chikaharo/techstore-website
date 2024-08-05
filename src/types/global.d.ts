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
	_id: string;
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
	images: ProdImage[];
	tags?: string;
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

interface ProdImage {
	asset_id: string;
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

interface Brand {
	_id?: string;
	title: string;
	createdAt: string;
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

interface Tag {
	title: string;
	url: string;
}
