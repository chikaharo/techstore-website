import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) => {
	return (
		<div className={cn("h-full mx-auto container px-2.5 md:px-12", className)}>
			{children}
		</div>
	);
};

export default MaxWidthWrapper;
