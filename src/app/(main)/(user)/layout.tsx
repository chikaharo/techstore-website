"use client";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedUserLayout = ({
	children,

	...props
}: {
	children: ReactNode;
}) => {
	const { data: session } = useSession();
	console.log("session protected paged:", session);
	useEffect(() => {
		if (!session) {
			return redirect("/login");
		}
	}, []);

	return <>{children}</>;
};

export default ProtectedUserLayout;
