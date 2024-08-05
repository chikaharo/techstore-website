import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Column";

interface Props {
	colors: Color[];
}

const ListColorClient = ({ colors }: Props) => {
	return <DataTable columns={columns} data={colors} />;
};

export default ListColorClient;
