import { DataTable } from "@/components/ui/data-table";
import { Product, columns } from "./Column";

interface Props {
	products: Product[];
}

const ListProductClient = ({ products }: Props) => {
	return <DataTable columns={columns} data={products} />;
};

export default ListProductClient;