import { DataTable } from "@/components/ui/data-table";
import { Category, columns } from "./Column";

interface Props {
	categories: Category[];
}

const ListCategoryClient = ({ categories }: Props) => {
	return <DataTable columns={columns} data={categories} />;
};

export default ListCategoryClient;
