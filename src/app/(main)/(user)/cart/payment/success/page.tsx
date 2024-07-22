import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const PaymentSuccessPage = () => {
	return (
		<Card className="w-[450px] my-8 mx-auto text-center">
			<CardHeader>
				<CardTitle>Payment Successfully</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center justify-center">
				<CheckIcon className="h-16 w-16 text-green-600 my-4" />
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				<Link
					href="/"
					className="px-6 py-3 flex items-center gap-2 hover:underline"
				>
					<ArrowUturnLeftIcon className="h-6 w-6" />
					Go Back to Your Order
				</Link>
			</CardFooter>
		</Card>
	);
};

export default PaymentSuccessPage;
