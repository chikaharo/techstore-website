"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState<User>();

	useEffect(() => {
		const getUserData = async () => {
			setLoading(true);
			try {
				const res = await axios.get("/user/me", {
					headers: {
						Authorization: `Bearer ${session?.user?.accessToken}`,
					},
				});
				console.log("getUserData: ", res.data.data);
				setUserData(res.data.data);
			} catch (error) {}
			setLoading(false);
		};
		getUserData();
	}, []);

	return (
		<div className="flex w-full h-screen flex-col px-8 lg:px-20 bg-white">
			{loading && <div className="flex w-full py-8">Loading...</div>}
			<div className="w-full flex-col gap-y-6 py-8">
				<div className="w-full flex items-center gap-x-4">
					<div className="text-slate-800 font-semibold">Name: </div>
					<div className="">{userData?.name}</div>
				</div>
				<div className="w-full flex items-center gap-x-4">
					<div className="text-slate-800 font-semibold">Email: </div>
					<div className="">{userData?.email}</div>
				</div>

				<div className="w-full flex items-center gap-x-4">
					<div className="text-slate-800 font-semibold">Role: </div>
					{/* @ts-ignore  */}
					<div className="">{userData?.role}</div>
				</div>
				<div className="mt-6 w-full flex items-center justify-end gap-x-4">
					<Link
						className="w-max flex items-center gap-x-2 p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm md:text-base"
						href="/user/change-password"
					>
						Change password
					</Link>
					<Button variant="destructive">Delete Account</Button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
