import LoadingModal from "@/components/LoadingModal";
import { ReactNode, Suspense } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Suspense fallback={<LoadingModal />}>{children}</Suspense>{" "}
		</div>
	);
};

export default AuthLayout;
