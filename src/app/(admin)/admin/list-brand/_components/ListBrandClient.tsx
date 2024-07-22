import { DataTable } from "@/components/ui/data-table";
import { Brand, columns } from "./Column";

interface Props {
	brands: Brand[];
}

const ListBrandClient = ({ brands }: Props) => {
	return <DataTable columns={columns} data={brands} />;
};

export default ListBrandClient;
