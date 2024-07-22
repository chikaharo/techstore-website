import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import MobileFooter from "@/components/MobileFooter";

// const fontSans = FontSans({
// 	subsets: ["latin"],
// 	variable: "--font-sans",
// });

export const metadata: Metadata = {
	title: "Tech Store Page",
	description: "Buy the technology products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="flex flex-col min-h-[calc(100vh-5rem)] pb-24 lg:pb-20 bg-slate-50">
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</main>
			<Footer />
			<MobileFooter />
		</>
	);
}
