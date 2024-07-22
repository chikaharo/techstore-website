import Link from "next/link";

const Footer = () => {
	return (
		<footer className="hidden lg:block w-full border-t-2 border-slate-800 p-2 bg-slate-700 text-white py-8">
			<div className="max-w-6xl grid grid-cols-3 mx-auto">
				<div className="flex flex-col  gap-3">
					<h3>INFORMATION AND POLICY</h3>
					<Link href="#" className=" cursor-pointer ml-2">
						Privacy Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Refund Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Shipping Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Terms Of Service
					</Link>
				</div>
				<div className="flex flex-col  gap-3">
					<h3>INFORMATION AND POLICY</h3>
					<Link href="#" className=" cursor-pointer ml-2">
						Privacy Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Refund Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Shipping Policy
					</Link>
					<Link href="#" className=" cursor-pointer ml-2">
						Terms Of Service
					</Link>
				</div>
				<div className="flex flex-col">
					<div className="flex gap-4 items-center ml-2">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
							alt="Facebook"
							className=" w-8 h-8 cursor-pointer "
						/>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
							alt="Instagram"
							className=" w-8 h-8 cursor-pointer "
						/>
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_NfEPVDNcg7ZhOZeDCIWtW3jccP8xmyRng&s"
							alt="Youtube"
							className=" w-8 h-8 cursor-pointer "
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
