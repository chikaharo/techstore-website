"use client";
import { CartProvider } from "@/providers/CartProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedUserLayout = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	console.log("session protected paged:", session?.user.accessToken);
	useEffect(() => {
		if (status !== "loading" && status == "unauthenticated") {
			return redirect("/login");
		}
	}, [status]);

	return (
		<>
			<CartProvider>{children}</CartProvider>
		</>
	);
};

export default ProtectedUserLayout;
