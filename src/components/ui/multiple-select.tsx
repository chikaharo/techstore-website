import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Color } from "@/app/(admin)/admin/list-color/_components/Column";

interface ISelectProps {
	values: Color[];
	defaultValues?: string[];
	handleChange: (items: string) => void;
}

interface ITitleById {
	[key: string]: string;
}

const MultiSelect = ({ values, defaultValues, handleChange }: ISelectProps) => {
	let defaultSelectedItems: string[] = [];
	let defaultSelectedTitles: string[] = [];

	if (defaultValues) {
		defaultSelectedItems = defaultValues;
		const titleById: ITitleById = {};
		values.forEach((vl) => {
			titleById[vl.id] = vl.title;
		});
		defaultSelectedTitles = values.map((vl) => titleById[vl.id]);
	}

	const [selectedItems, setSelectedItems] =
		useState<string[]>(defaultSelectedItems);
	const [selectedTitles, setSelectedTitles] = useState<string[]>(
		defaultSelectedTitles
	);
	const handleSelectChange = (value: Color) => {
		handleChange(value.id);
		if (!selectedItems.includes(value.id)) {
			setSelectedItems((prev) => [...prev, value.id]);
			setSelectedTitles((prev) => [...prev, value.title]);
		} else {
			const referencedArrayItems = [...selectedItems];
			const indexOfItemToBeRemoved = referencedArrayItems.indexOf(value.id);
			referencedArrayItems.splice(indexOfItemToBeRemoved, 1);
			const referencedArrayTitles = [...selectedTitles];
			const indexOfNameToBeRemoved = referencedArrayTitles.indexOf(value.title);
			referencedArrayTitles.splice(indexOfItemToBeRemoved, 1);
			setSelectedItems(referencedArrayItems);
			setSelectedTitles(referencedArrayTitles);
		}
	};

	const isOptionSelected = (value: string): boolean => {
		return selectedItems.includes(value) ? true : false;
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex w-full justify-start gap-2 font-bold"
					>
						<span>Select Colors: </span>
						{selectedTitles.map((item, idx) => (
							<span key={idx}>{item}, </span>
						))}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<DropdownMenuLabel>Colors</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{values.map((value: ISelectProps["values"][0], index: number) => {
						return (
							<DropdownMenuCheckboxItem
								onSelect={(e) => e.preventDefault()}
								key={index}
								checked={isOptionSelected(value.id)}
								onCheckedChange={() => handleSelectChange(value)}
							>
								{`${value.title}  - ${value.value}`}
							</DropdownMenuCheckboxItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default MultiSelect;
