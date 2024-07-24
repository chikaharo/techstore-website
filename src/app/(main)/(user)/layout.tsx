"use client";
import LoadingModal from "@/components/LoadingModal";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";

const ProtectedUserLayout = ({
	children,

	...props
}: {
	children: ReactNode;
}) => {
	const { data: session } = useSession();
	console.log("user layout session: ", session);
	// useEffect(() => {
	// 	if (!session) {
	// 		return redirect("/login");
	// 	}
	// }, []);
	// const { session, loading } = useAuth();

	return (
		<>
			<Suspense fallback={<LoadingModal />}>{children}</Suspense>
		</>
	);
};

export default ProtectedUserLayout;
