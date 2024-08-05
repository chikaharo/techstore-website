import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Column";

interface Props {
	categories: Category[];
}

const ListCategoryClient = ({ categories }: Props) => {
	return <DataTable columns={columns} data={categories} />;
};

export default ListCategoryClient;
